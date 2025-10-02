import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MyUniverseComponent } from './pages/my-universe/my-universe.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'my-universe', component: MyUniverseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
