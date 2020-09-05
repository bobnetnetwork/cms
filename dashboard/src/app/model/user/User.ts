import { Observable } from 'rxjs';
import { Role } from './Role';

export class User {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  pwd?: string;
  hash?: string;
  salt?: string;
  accountExpired?: boolean;
  accountLocked?: boolean;
  credentialsExpired?: boolean;
  enabled?: boolean;
  registeredAt?: Date;
  roles?: Observable<Role>;
}
