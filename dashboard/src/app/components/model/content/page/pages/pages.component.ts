import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../../model/content/Page';
import { PageService } from '../../../../../services/model/content/page/page.service';

export class PageMessage {
  content: Page[];
  message: String;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pages: Page[];
  msg: PageMessage;

  constructor(private service: PageService) {
    this.service.getAllPages().subscribe(res => {
      this.msg = res as PageMessage;
      this.pages = this.msg.content;
    });
  }

  ngOnInit(): void {
  }

}
