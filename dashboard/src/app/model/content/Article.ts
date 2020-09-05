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
  categories?: Observable<Category>;
}
