import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: `
    <div class="container">
      <h1>Welcome to My App</h1>
      <button (click)="goToAuth()">Login / Signup</button>
    </div>
  `
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
