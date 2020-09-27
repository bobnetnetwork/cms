import { Observable } from 'rxjs';
import { Category } from './Category';
import { Tag } from './Tag';
import { User } from '../user/User';

export class Article {
  title?: string;
  headline?: string;
  content?: string;
  featuredImage?: string;
  author?: Observable<User>;
  slug?: string;
  addedAt?: Date;
  tags?: Observable<Tag>;
  categories?: Category[];
  status?: string;
}

export class ArticlesMessage {
  content: Article[];
  message: string;
}

export class ArticleMessage {
  content: Article;
  message: string;
  success: boolean;
}
