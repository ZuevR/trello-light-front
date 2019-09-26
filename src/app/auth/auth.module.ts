import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
// import { LoginPageComponent } from './components/pages/login-page/login-page.component';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: []
})
export class AuthModule { }
