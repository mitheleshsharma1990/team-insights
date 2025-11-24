import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private apiUrl = '/api/users';

  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
