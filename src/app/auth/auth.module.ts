import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { FailureMessageComponent } from './components/failure-message/failure-message.component';

@NgModule({
  entryComponents: [
    SuccessMessageComponent,
    FailureMessageComponent
  ],
  declarations: [
    SignupPageComponent,
    SigninPageComponent,
    SuccessMessageComponent,
    FailureMessageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [],
})
export class AuthModule {
}
