import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { SharedModule } from './shared/shared.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { ModalNewBoardComponent } from './components/modal-new-board/modal-new-board.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainLayoutComponent,
    MainPageComponent,
    ModalNewBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  entryComponents: [ModalNewBoardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
