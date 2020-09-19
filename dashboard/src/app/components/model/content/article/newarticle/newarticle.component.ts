import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/content/Article';
import { ArticleService } from 'src/app/services/model/content/article/article.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class ArticleMessage {
  content: Article;
  message: String;
  success: Boolean;
}

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})
export class NewarticleComponent implements OnInit {

  private slug: string;
  private msg: ArticleMessage;
  article: Article;
  articleForm: FormGroup;

  constructor(private route: ActivatedRoute, private service: ArticleService, private formBuilder: FormBuilder) { 
     this.generateForm();
  }

  private generateForm() {
    this.articleForm = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      headline: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  saveAsDraft() {
    console.log('Saved Draft!');
    console.log(this.articleForm);
    console.log('Title: ', this.articleForm.get('title').value);
  }

  publish() {
    console.log("New Post creating...");
    this.article = new Article();    
    this.article.title = this.articleForm.get('title').value;
    this.article.content = this.articleForm.get('content').value;
    this.article.headline = this.articleForm.get('headline').value;
    this.service.insertArticle(this.article).subscribe(res => {
      console.log('Update log: ', res);
      this.msg = res as ArticleMessage;
      console.log("success: ", this.msg.success);
      if(this.msg.success){
        window.location.href="/articles/" + this.msg.content.slug;
      } else {

      }
    });
  }

  delete() {
    /*this.service.deleteArticle(this.article.slug).subscribe(res => {
      console.log('Delete log: ', res);
    });*/
  }

}
