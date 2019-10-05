import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService as Social, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from '../../../../shared/services/auth.service';
import { AuthResponse, User } from '../../../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  animations: [
    trigger('showHide', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class SignupPageComponent implements OnInit, OnDestroy {

  showSuccess = false;
  form: FormGroup;
  submitting = false;
  userEmail: string;
  sub: Subscription;
  sSub: Subscription;

  constructor(
    public socialAuthService: Social,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    const user: User = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.sub = this.authService.signUp(user).subscribe((response: AuthResponse) => {
      this.form.reset();
      this.submitting = false;
      this.userEmail = response.email;
      this.showSuccess = true;
    }, () => {
      this.submitting = false;
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.requestSocialUser(user);
      });
  }

  requestSocialUser(socialUser) {
    this.sSub = this.authService.socialAuth(socialUser).subscribe(result => {
      this.router.navigate([`/boards`]);
    }, error => {
      console.log(error);
    });
  }

}
