import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Task } from '../../shared/interfaces';
import { ModalTaskDetailsComponent } from '../modal-task-details/modal-task-details.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() taskOnRemove: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalTaskDetailsComponent, {
      width: '650px',
      panelClass: 'modal-task',
      data: { task: this.task },
      position: { top: '100px' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.taskOnRemove.emit(this.task);
      }
    });
  }
}
