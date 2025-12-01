import { inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'ENGINEER';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  currentUser = signal<TokenPayload | null>(this.getUserFromStorage());

  getUserFromStorage(): TokenPayload | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          return jwtDecode<TokenPayload>(token);
        } catch {
          return null;
        }
      }
    }
    return null;
  }
  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>('/api/auth/login', { email, password })
      .pipe(
        tap((response) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          const decoded = jwtDecode<TokenPayload>(token);
          this.currentUser.set(decoded);
          console.log('Login successful, token stored.', token);
        })
      );
  }
}
