// src/app/pages/auth/auth.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule], // for [(ngModel)]
  template: `
    <div class="auth-container">
      <h2>{{ isLogin ? 'Login' : 'Signup' }}</h2>

      <form (ngSubmit)="onSubmit()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
        <button type="submit">{{ isLogin ? 'Login' : 'Signup' }}</button>
      </form>

      <p (click)="toggleAuth()">
        {{ isLogin ? 'Need an account? Signup' : 'Already have an account? Login' }}
      </p>
    </div>
  `
})
export class AuthComponent {
  email = '';
  password = '';
  isLogin = true;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onSubmit() {
    try {
      const result = this.isLogin
        ? await this.supabase.signIn(this.email, this.password)
        : await this.supabase.signUp(this.email, this.password);

      if (result.error) throw result.error;
      this.router.navigate(['/my-universe']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  toggleAuth() {
    this.isLogin = !this.isLogin;
  }
}
