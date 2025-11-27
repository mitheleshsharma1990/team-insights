import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, CreateUserRequest } from '@team-insights/util-interfaces';
@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private apiUrl = '/api/users';

  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
