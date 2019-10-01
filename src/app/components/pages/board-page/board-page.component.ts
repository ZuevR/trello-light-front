import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  CdkDragMove,
  CdkDragSortEvent, CdkDragStart,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Board, Task } from '../../../shared/interfaces';
import { BoardService } from '../../../services/board.service';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  bSub: Subscription;
  dSub: Subscription;
  mSub: Subscription;
  cSub: Subscription;
  tSub: Subscription;
  ntSub: Subscription;

  id: string;
  board: Board;
  display = false;
  tasksTodo: Task[];
  tasksProgress: Task[];
  tasksDone: Task[];

  constructor(
    private boardService: BoardService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.bSub = this.boardService.getBoard(this.id).subscribe((board: Board) => {
      this.board = board;
      this.separateTasks(board.tasks);
    }, error => {
      if (error.status === 403) {
        this.router.navigate(['/boards']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
    if (this.ntSub) {
      this.ntSub.unsubscribe();
    }
  }

  changeBoard(newTitle: string) {
    const oldTitle = this.board.title;
    this.board.title = newTitle;
    this.cSub = this.boardService.changeBoard(this.board).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
      this.board.title = oldTitle;
    });
  }

  deleteBoard() {
    this.dSub = this.boardService.deleteBoard(this.id).subscribe(result => {
      this.router.navigate(['/boards']);
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '250px',
    });

    this.mSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBoard();
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.setCurrentTaskStatus();
  }

  setCurrentTaskStatus() {
    this.tasksTodo.forEach((task: Task, index) => {
      task.status = 'TODO';
      task.position = index + 1;
    });
    this.tasksProgress.forEach((task: Task, index) => {
      task.status = 'PROGRESS';
      task.position = index + 1;
    });
    this.tasksDone.forEach((task: Task, index) => {
      task.status = 'DONE';
      task.position = index + 1;
    });
    const newTasks: Task[] = [].concat(this.tasksTodo, this.tasksProgress, this.tasksDone);
    this.ntSub = this.taskService.moveTask(newTasks).subscribe(result => {
      console.log(result);
    });
  }

  separateTasks(tasks: Task[]) {
    this.tasksTodo = tasks.filter(task => task.status === 'TODO');
    this.tasksProgress = tasks.filter(task => task.status === 'PROGRESS');
    this.tasksDone = tasks.filter(task => task.status === 'DONE');
  }

  createNewTask(event) {

    let length;
    switch (event.status) {
      case 'TODO':
        length = this.tasksTodo.length;
        break;
      case 'PROGRESS':
        length = this.tasksProgress.length;
        break;
      case 'DONE':
        length = this.tasksDone.length;
        break;
    }

    const task: Task = {
      boardId: this.id,
      title: event.title,
      status: event.status,
      position: length + 1
    };

    this.tSub = this.taskService.addNewTask(task).subscribe((newTask: Task) => {
      switch (newTask.status) {
        case 'TODO':
          this.tasksTodo.push(newTask);
          break;
        case 'PROGRESS':
          this.tasksProgress.push(newTask);
          break;
        case 'DONE':
          this.tasksDone.push(newTask);
          break;
      }
    });
  }

}
