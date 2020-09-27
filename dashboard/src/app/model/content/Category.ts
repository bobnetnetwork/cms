import { Observable } from 'rxjs';
import { Article } from './Article';

export class Category {
  name?: string;
  description?: string;
  featuredImage?: string;
  slug?: string;
  addedAt?: Date;
  parent?: Category;
  articles?: Observable<Article>;
}

export class CategoriesMessage {
  content: Category[];
  message: string;
}

export class CategoryMessage {
  content: Category;
  message: string;
}
