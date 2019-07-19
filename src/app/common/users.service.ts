import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './users.model';
import { map } from 'rxjs/operators';


@Injectable()

export class UsersService {
  appUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}


  getUserbyLogin(login: string)  {
    return this.httpClient.get<User>(this.appUrl + `/users?login=${login}`).pipe(map(user => user[0] ? user[0] : undefined));
  }
}
