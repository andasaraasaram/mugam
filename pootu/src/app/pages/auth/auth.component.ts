import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-auth',
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
      let result;
      if (this.isLogin) {
        result = await this.supabase.signIn(this.email, this.password);
      } else {
        result = await this.supabase.signUp(this.email, this.password);
      }

      if (result.error) throw result.error;

      this.router.navigate(['/my-universe']);
    } catch (error) {
      console.error('Auth error:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  }

  toggleAuth() {
    this.isLogin = !this.isLogin;
  }
}
