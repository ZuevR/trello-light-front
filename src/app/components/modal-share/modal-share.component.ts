import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss']
})
export class ModalShareComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalShareComponent>) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required])
    });
  }

  submit() {
    this.dialogRef.close(this.form.get('email').value.trim());
  }

}
