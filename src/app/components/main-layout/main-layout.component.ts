import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  userName: any;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    if (!this.authService.user) {
      this.authService.getCurrentUser().subscribe((user: User) => {
        this.authService.user = user;
        this.userName = this.authService.user.username;
      });
    } else {
      this.userName = this.authService.user.username;
    }
  }

  goHome() {
    this.router.navigate(['/boards']);
  }

  logout() {
    this.authService.logout().subscribe(result => {
      this.userName = result;
    });
  }
}
