import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-task-details',
  templateUrl: './modal-task-details.component.html',
  styleUrls: ['./modal-task-details.component.scss']
})
export class ModalTaskDetailsComponent implements OnInit {

  @ViewChild('inp', { static: false }) input: ElementRef;
  @ViewChild('txt', { static: false }) textarea: ElementRef;
  display = false;
  displayArea = true;
  task: Task;
  form: FormGroup;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<ModalTaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
  }


  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(null, Validators.required)
    });
    this.task = this.data.task;
    this.displayArea = !this.task.description;
  }

  showInput() {
    this.display = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.value = this.task.title;
    }, 0);
  }

  hideInput() {
    this.display = false;
  }

  saveTitle() {
    const newTitle = this.input.nativeElement.value;
    if (newTitle !== this.task.title && newTitle.trim()) {
      const task: Task = {
        id: this.task.id,
        boardId: this.task.boardId,
        status: this.task.status,
        title: newTitle
      };
      this.taskService.changeTaskTitle(task).subscribe((result: Task) => {
        this.task.title = result.title;
      });
    }
    this.hideInput();
  }

  submit() {
    const description = this.form.get('description').value;
    const task: Task = {
      id: this.task.id,
      boardId: this.task.boardId,
      status: this.task.status,
      title: this.task.title,
      description
    };

    this.taskService.changeTaskDescription(task).subscribe((result: Task) => {
      this.task.description = result.description;
    });

    this.displayArea = false;
  }

  showArea() {
    this.displayArea = true;
    setTimeout(() => {
      this.textarea.nativeElement.value = this.task.description;
      this.textarea.nativeElement.focus();
      this.form.setValue({ description: this.task.description });
    }, 0);
  }

  hideArea() {
    setTimeout(() => {
      this.displayArea = false;
    }, 200);
  }
}
