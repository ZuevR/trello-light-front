import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthResponse } from '../../../shared/interfaces';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-failure-message',
  templateUrl: './failure-message.component.html',
  styleUrls: ['./failure-message.component.scss']
})
export class FailureMessageComponent implements OnInit {

  submit = false;
  userEmail: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<FailureMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendVerificationEmail() {
    this.authService.requestNewEmail(this.data.id).subscribe((response: AuthResponse) => {
      this.userEmail = response.email;
      this.submit = true;
    });
  }

  closeInfo() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
