import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../../../shared/interfaces';
import { BoardService } from '../../../services/board.service';
import { ModalNewBoardComponent } from '../../modal-new-board/modal-new-board.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  title: string;
  boards: Board[];
  dSub: Subscription;
  bSub: Subscription;

  constructor(
    public boardService: BoardService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.boardService.getAllBoards().subscribe((response: Board[]) => {
      this.boards = response;
      console.log(this.boards);
    });

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalNewBoardComponent, {
      width: '250px',
      data: { name: this.title }
    });
    this.dSub = dialogRef.afterClosed().subscribe((title: string) => {
      if (title) {
        this.createBoard(title);
      }
    });
  }

  createBoard(title: string) {
    const board: Board = { title };
    this.bSub = this.boardService.createNewBoard(board).subscribe((response: Board) => {
      this.boards.push(response);
    }, error => {
      console.log(error);
    });
  }
}