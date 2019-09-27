import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessMessageComponent>) {}

  ngOnInit() {
  }

  closeSnackBar() {
    this.dialogRef.close();
  }
}
