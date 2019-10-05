import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { AuthResponse } from '../../../shared/interfaces';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-failure-message',
  templateUrl: './failure-message.component.html',
  styleUrls: ['./failure-message.component.scss'],
  animations: [
    trigger('showHide', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class FailureMessageComponent implements OnInit, OnDestroy {

  submit = false;
  userEmail: string;
  sub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<FailureMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendVerificationEmail() {
    this.sub = this.authService.requestNewEmail(this.data.id).subscribe((response: AuthResponse) => {
      this.userEmail = response.email;
      this.submit = true;
    }, error => {
      console.log(error);
    });
  }

  closeInfo() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
