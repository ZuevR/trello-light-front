import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';

// import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupPageComponent },
  // { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
