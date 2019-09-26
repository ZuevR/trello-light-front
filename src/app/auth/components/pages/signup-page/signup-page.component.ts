import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { AuthService } from '../../../../shared/services/auth.service';
import { AuthResponse, User } from '../../../../shared/interfaces';

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
export class SignupPageComponent implements OnInit {

  showSuccess = false;
  form: FormGroup;
  submitting = false;
  userEmail: string;

  constructor(
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

    this.authService.signUp(user).subscribe((response: AuthResponse) => {
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

}
