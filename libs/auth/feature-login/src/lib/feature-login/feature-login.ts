import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-feature-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feature-login.html',
  styleUrl: './feature-login.css',
})
export class FeatureLogin {
  private fb = new FormBuilder();
  private auth = inject(AuthService);
  private router = inject(Router);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor() {}
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email!, password!).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
    }
  }
}
