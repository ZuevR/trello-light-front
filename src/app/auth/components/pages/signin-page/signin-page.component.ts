import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../../shared/services/auth.service';
import { SuccessMessageComponent } from '../../success-message/success-message.component';
import { FailureMessageComponent } from '../../failure-message/failure-message.component';
import { AuthResponse, User } from '../../../../shared/interfaces';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitting = false;
  sub: Subscription;
  rSub: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.rSub = this.route.queryParams.subscribe((params: Params) => {
      const regStatus = params.status;
      const userId = +params.userId;
      this.openDialog(regStatus, userId);
    });

    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  openDialog(status: string, id: number): void {
    if (status === 'true') {
      this.dialog.open(SuccessMessageComponent, {
        panelClass: 'my-panel-success'
      });
    } else if (status === 'false') {
      this.dialog.open(FailureMessageComponent, {
        panelClass: 'my-panel-failure',
        data: { id }
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.sub = this.authService.login(user).subscribe((response: AuthResponse) => {
      this.form.reset();
      this.router.navigate([`/boards`]);
      this.submitting = false;
    }, () => {
      this.submitting = false;
    });
  }
}
