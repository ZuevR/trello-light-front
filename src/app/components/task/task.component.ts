import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Task } from '../../shared/interfaces';
import { ModalTaskDetailsComponent } from '../modal-task-details/modal-task-details.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  @Output() taskOnRemove: EventEmitter<Task> = new EventEmitter<Task>();
  sub: Subscription;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalTaskDetailsComponent, {
      width: '650px',
      panelClass: 'modal-task',
      data: { task: this.task },
      position: { top: '100px' }
    });

    this.sub = dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.taskOnRemove.emit(this.task);
      }
    });
  }
}
