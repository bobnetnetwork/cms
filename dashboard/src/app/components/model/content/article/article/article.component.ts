import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/content/Article';
import { ArticleService } from 'src/app/services/model/content/article/article.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class ArticleMessage {
  content: Article[];
  message: String;
}

@Component({
  selector: 'app-singlearticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private slug: string;
  private msg: ArticleMessage;
  article: Article;
  articleForm: FormGroup;

  constructor(private route: ActivatedRoute, private service: ArticleService, private formBuilder: FormBuilder) {

    this.slug = this.route.snapshot.paramMap.get('articleslug');
    this.service.getArticle(this.slug).subscribe(res => {
      console.log(res);
      this.msg = res as ArticleMessage;
      this.article = this.msg.content as Article;
      this.generateForm();
    });

  }

  private generateForm() {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title),
      content: new FormControl(this.article.content),
      headline: new FormControl(this.article.headline)
    });
  }

  ngOnInit(): void {

  }

  underLectoring() {
    this.article.status = 'under lectoring';
    this.service.updateArticle(this.article).subscribe(res => {
      console.log('Update log: ', res);
    });
  }

  reject() {
    this.article.status = 'rejected';
    this.service.updateArticle(this.article).subscribe(res => {
      console.log('Update log: ', res);
    });
  }

  saveAsDraft() {
    console.log('Saved Draft!');
    console.log(this.articleForm);
    console.log('Title: ', this.articleForm.get('title').value);
    this.article.status = 'draft';
    this.service.updateArticle(this.article).subscribe(res => {
      console.log('Update log: ', res);
    });
  }

  publish() {
    this.article.title = this.articleForm.get('title').value;
    this.article.content = this.articleForm.get('content').value;
    this.article.headline = this.articleForm.get('headline').value;
    this.service.updateArticle(this.article).subscribe(res => {
      console.log('Update log: ', res);
    });
    this.article.status = 'published';
  }

  delete() {
    this.service.deleteArticle(this.article.slug).subscribe(res => {
      console.log('Delete log: ', res);
      window.location.href = '/articles';
    });
  }
}
