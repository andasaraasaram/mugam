import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-my-universe',
  template: `
    <div *ngIf="user; else notLoggedIn">
      <h1>Welcome, {{ user.email }}</h1>
      <pre>{{ user | json }}</pre>
      <button (click)="logout()">Logout</button>
    </div>

    <ng-template #notLoggedIn>
      <p>You are not logged in.</p>
      <button (click)="goToAuth()">Go to Login</button>
    </ng-template>
  `
})
export class MyUniverseComponent implements OnInit {
  user: any = null;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    this.user = await this.supabase.getUser();
    if (!this.user) {
      this.router.navigate(['/auth']);
    }
  }

  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/']);
  }

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
