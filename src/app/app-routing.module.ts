import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/not-auth.guard';

const routes: Routes = [
  { path: '', component: WelcomePageComponent, canActivate: [NotAuthGuard] },
  {
    path: 'boards', component: MainLayoutComponent, children: [
      { path: '', component: MainPageComponent },
      { path: ':id', component: BoardPageComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(value => value.AuthModule), canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
