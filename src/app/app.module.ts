import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { SharedModule } from './shared/shared.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { ModalNewBoardComponent } from './components/modal-new-board/modal-new-board.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';
import { BoardTitleComponent } from './components/board-title/board-title.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ColumnFooterComponent } from './components/column-footer/column-footer.component';
import { TaskComponent } from './components/task/task.component';
import { ModalTaskDetailsComponent } from './components/modal-task-details/modal-task-details.component';
import { ModalShareComponent } from './components/modal-share/modal-share.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainLayoutComponent,
    MainPageComponent,
    ModalNewBoardComponent,
    BoardPageComponent,
    BoardTitleComponent,
    ModalConfirmComponent,
    ColumnFooterComponent,
    TaskComponent,
    ModalTaskDetailsComponent,
    ModalShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  entryComponents: [
    ModalNewBoardComponent,
    ModalConfirmComponent,
    ModalTaskDetailsComponent,
    ModalShareComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
