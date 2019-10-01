import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-column-footer',
  templateUrl: './column-footer.component.html',
  styleUrls: ['./column-footer.component.scss'],
})
export class ColumnFooterComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  @Input() status: string;
  @ViewChild('txt', { static: false }) textarea: ElementRef;
  @Output() setTaskProps: EventEmitter<object> = new EventEmitter<object>();
  addDialog = false;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required)
    });
  }

  showAddDialog() {
    this.addDialog = true;
    this.focusTextarea();
  }

  hideAddDialog() {
    this.addDialog = false;
  }

  focusTextarea() {
    setTimeout(() => {
      this.textarea.nativeElement.focus();
    }, 0);
  }

  submit() {
    const taskTitle = this.textarea.nativeElement.value.trim();
    this.setTaskProps.emit({ status: this.status, title: taskTitle });
    this.form.reset();
    this.hideAddDialog();
  }
}
