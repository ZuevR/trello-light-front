import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-new-board',
  templateUrl: './modal-new-board.component.html',
  styleUrls: ['./modal-new-board.component.scss']
})
export class ModalNewBoardComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalNewBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required)
    });
  }

  setBoardTitle() {
    this.dialogRef.close(this.form.get('title').value);
  }
}
