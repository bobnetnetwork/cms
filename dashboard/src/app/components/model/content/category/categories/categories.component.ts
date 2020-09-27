import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {CategoriesMessage, Category} from 'src/app/model/content/Category';
import { CategoryService } from 'src/app/services/model/content/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private msg: CategoriesMessage;
  category: Category;
  categoryForm: FormGroup;
  categories: Category[];

  constructor(private service: CategoryService) {
    this.getCategories();
  }

  ngOnInit(): void {
  }

  private generateForm(): void {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category.name),
      description: new FormControl(this.category.description)
    });
  }

  private getCategories(): void {
    this.service.getAllCategories().subscribe( res => {
      this.msg = res as CategoriesMessage;
      this.categories = this.msg.content;
      this.generateForm();
    });
  }

  addNew(): void {
    this.category.name = this.categoryForm.get('name').value;
    this.category.description = this.categoryForm.get('description').value;
    this.service.insertCategory(this.category).subscribe( res => {
      console.log('Category insert log: ', res);
      this.getCategories();
    });

  }

}
