import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { SuccessMessageComponent } from '../../success-message/success-message.component';
import { FailureMessageComponent } from '../../failure-message/failure-message.component';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  form: FormGroup;
  submitting = false;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const regStatus = params.status;
      const userId = +params.userId;
      this.openDialog(regStatus, userId);
    });
  }

  openDialog(status: string, id: number): void {
    let dialogRef;
    if (status === 'true') {
      dialogRef = this.dialog.open(SuccessMessageComponent, {
        panelClass: 'my-panel-success'
      });
    } else if (status === 'false') {
      dialogRef = this.dialog.open(FailureMessageComponent, {
        panelClass: 'my-panel-failure',
        data: { id }
      });
    }
  }
}
