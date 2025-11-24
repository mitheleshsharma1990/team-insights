import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>('/api/auth/login', { email, password })
      .pipe(
        tap((response) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          console.log('Login successful, token stored.', token);
        })
      );
  }
}
