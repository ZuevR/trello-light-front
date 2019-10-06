import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  userName: any;
  uSub: Subscription;
  lSub: Subscription;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    if (!this.authService.user) {
      this.uSub = this.authService.getCurrentUser().subscribe((user: User) => {
        this.authService.user = user;
        this.userName = this.authService.user.username;
      }, error => {
        this.authService.setToken(null);
        this.router.navigate(['/']);
      });
    } else {
      this.userName = this.authService.user.username;
    }
  }

  ngOnDestroy(): void {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  goHome() {
    this.router.navigate(['/boards']);
  }

  logout() {
    this.lSub = this.authService.logout().subscribe(result => {
      this.userName = result;
      this.router.navigate(['/']);
    });
  }
}
