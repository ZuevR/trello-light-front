import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board-title',
  templateUrl: './board-title.component.html',
  styleUrls: ['./board-title.component.scss']
})
export class BoardTitleComponent implements OnInit, AfterViewChecked {

  @Input() title: string;
  @Output() titleChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('btn', { static: false }) button: ElementRef;
  @ViewChild('inp', { static: false }) input: ElementRef;

  display = false;
  componentWidth: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.componentWidth = this.button.nativeElement.clientWidth;
  }

  setInputWidth() {
    this.input.nativeElement.style.width = this.componentWidth + 'px';
  }

  focusInput() {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  showInput() {
    this.setInputWidth();
    this.input.nativeElement.value = this.title;
    this.display = true;
    this.focusInput();
  }

  showButton() {
    this.display = false;
  }

  changeTitle() {
    const newTitle = this.input.nativeElement.value;
    if (newTitle !== this.title && newTitle.trim()) {
      this.titleChange.emit(newTitle);
    }
    this.showButton();
  }

}
