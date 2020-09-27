import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article, ArticleMessage} from 'src/app/model/content/Article';
import { ArticleService } from 'src/app/services/model/content/article/article.service';
import {CategoriesMessage, Category, CategoryMessage} from 'src/app/model/content/Category';
import { CategoryService } from 'src/app/services/model/content/category/category.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-singlearticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private slug: string;
  private msg: ArticleMessage;
  private cmsg: CategoriesMessage;
  private c2msg: CategoryMessage;
  article: Article;
  articleForm: FormGroup;
  categories: Category[];

  constructor(private route: ActivatedRoute, private service: ArticleService, private categoryService: CategoryService) {
    this.slug = this.route.snapshot.paramMap.get('articleslug');
    this.getArticle();
    this.getCategories();
  }

  private getArticle(): void{
    this.service.getArticle(this.slug).subscribe(res => {
      console.log(res);
      this.msg = res as ArticleMessage;
      this.article = this.msg.content as Article;
      this.generateForm();
    });
  }

  private getCategories(): void {
    this.categoryService.getAllCategories().subscribe( res => {
      this.cmsg = res as CategoriesMessage;
      this.categories = this.cmsg.content;
    });
  }

  private generateForm(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title),
      content: new FormControl(this.article.content),
      headline: new FormControl(this.article.headline),
      categories: new FormControl()
    });
  }

  ngOnInit(): void {

  }

  underLectoring(): void {
    this.article.status = 'under lectoring';
    this.updateArticle();
  }

  reject(): void {
    this.article.status = 'rejected';
    this.updateArticle();
  }

  saveAsDraft(): void {
    this.article.status = 'draft';
    this.updateArticle();
  }

  publish(): void {
    this.article.status = 'published';
    this.updateArticle();
  }

  delete(): void {
    this.service.deleteArticle(this.article.slug).subscribe(res => {
      console.log('Delete log: ', res);
      window.location.href = '/articles';
    });
  }

  private updateArticle(): void {
    this.article.title = this.articleForm.get('title').value;
    this.article.content = this.articleForm.get('content').value;
    this.article.headline = this.articleForm.get('headline').value;
    const catSlug: string = this.articleForm.get('categories').value;
    this.categoryService.getCategoy(catSlug).subscribe( res => {
      this.c2msg = res as CategoryMessage;
      console.log(res);
      this.article.categories = [this.c2msg.content];
      console.log(this.article.categories);
      this.service.updateArticle(this.article).subscribe(res1 => {
        console.log('Update log: ', res1);
      });
    });
  }
}
