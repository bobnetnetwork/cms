import { Observable } from 'rxjs';
import { Article } from './Article';

export class Tag {
  title?: string;
  slug?: string;
  addedAt?: Date;
  articles?: Observable<Article>;
}
