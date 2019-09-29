import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-column-footer',
  templateUrl: './column-footer.component.html',
  styleUrls: ['./column-footer.component.scss'],
})
export class ColumnFooterComponent implements OnInit {

  constructor() {
  }

  @ViewChild('txt', { static: false }) textarea: ElementRef;

  addDialog = false;

  ngOnInit() {
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

  addTask() {
    console.log(this.textarea.nativeElement.value);
  }
}
