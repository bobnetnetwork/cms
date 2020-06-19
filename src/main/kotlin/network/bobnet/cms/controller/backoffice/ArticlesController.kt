package network.bobnet.cms.controller.backoffice

import network.bobnet.cms.controller.DisplayLanguageController
import network.bobnet.cms.model.content.Article
import network.bobnet.cms.repository.content.CategoryRepository
import network.bobnet.cms.repository.user.UserRepository
import network.bobnet.cms.service.ArticleService
import network.bobnet.cms.util.LoggedInUser
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.*
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.text.Normalizer


@Controller
class ArticlesController (
                    private val displayLanguageController: DisplayLanguageController,
                    private val categoryRepository: CategoryRepository,
                    private val articleService: ArticleService,
                    private val userRepository: UserRepository) {

    private val logger: Logger = LoggerFactory.getLogger(this.javaClass)

    private final val ROW_PER_PAGE = 5

    @GetMapping("/admin/articles")
    fun articles(model: Model, @RequestParam(value = "page", defaultValue = "1") pageNumber: Int): String{
        val articles = articleService.findAll(pageNumber, ROW_PER_PAGE)
        val count = articleService.count()
        val hasPrev: Boolean = pageNumber > 1
        val hasNext: Boolean = pageNumber * ROW_PER_PAGE < count

        model.addAttribute(displayLanguageController.getArticlesLabels(model))
        model["articles"] = articles
        model["hasPrev"] = hasPrev
        model["prev"] = pageNumber - 1
        model["hasNext"] = hasNext
        model["next"] = pageNumber + 1

        return "backoffice/articles"
    }

    @GetMapping("/admin/articles/{slug}")
    fun showEditArticle(@PathVariable slug: String, model: Model): String{
        model.addAttribute(displayLanguageController.getArticleEditorLabels(model))
        var article: Article = Article()
        try{
            article = articleService.findBySlug(slug)
        }catch(ex: Exception){
            model["errorMessage"] = ex.stackTrace.toString()
            logger.error(ex.stackTrace.toString())
        }
        model["add"] = false
        model["article"] = article
        model["categories"] = categoryRepository.findAllByOrderByAddedAtDesc().map { it.render() }

        return "backoffice/article"
    }



    @PostMapping("/admin/articles/{slug}")
    fun editArticle(@PathVariable slug: String, model: Model, @ModelAttribute("article") article: Article): String{
        model.addAttribute(displayLanguageController.getArticleEditorLabels(model))
        try{

            article.slug = slug
            article.id = articleService.findBySlug(slug).id
            articleService.update(article)
            return "redirect:/admin/articles/" + article.slug
        }catch(ex: Exception){
            model["errorMessage"] = ex.stackTrace.toString()
            logger.error(ex.stackTrace.toString())
            model["add"] = false
            return "backoffice/article"
        }
    }

    @GetMapping("/admin/articles/new")
    fun showAddArticle(model: Model): String{
        model.addAttribute(displayLanguageController.getArticleEditorLabels(model))
        var article: Article = Article()
        model["add"] = true
        model["article"] = article

        return "backoffice/article"
    }

    @PostMapping("/admin/articles/new")
    fun addArticle(model: Model, @ModelAttribute("article") article: Article): String{
        model.addAttribute(displayLanguageController.getArticleEditorLabels(model))
        try{
            article.author = LoggedInUser(userRepository).getUser()!!
            article.slug = slugify(article.title)
            val newArticle: Article = articleService.save(article)
            return "redirect:/admin/articles/" + newArticle.slug
        }catch (ex: Exception){
            model["errorMessage"] = ex.stackTrace.toString()
            logger.error(ex.stackTrace.toString())
            model["add"] = true
            return return "backoffice/article"
        }
    }

    private fun slugify(word: String, replacement: String = "-") = Normalizer
            .normalize(word, Normalizer.Form.NFD)
            .replace("[^\\p{ASCII}]".toRegex(), "")
            .replace("[^a-zA-Z0-9\\s]+".toRegex(), "").trim()
            .replace("\\s+".toRegex(), replacement)
            .toLowerCase()

}
