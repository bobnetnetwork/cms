import { Observable } from 'rxjs';
import { User } from './User';

export class Role {
  name?: string;
  slug?: string;
  users?: Observable<User>;
}
