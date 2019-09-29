import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../../../shared/interfaces';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  id: string;
  bSub: Subscription;
  dSub: Subscription;
  mSub: Subscription;
  cSub: Subscription;
  board: Board;
  display = false;

  artists = [
    'Artist I - Davido',
    'Artist II - Wizkid',
    'Artist III - Burna Boy'
  ];

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.bSub = this.boardService.getBoard(this.id).subscribe((board: Board) => {
      this.board = board;
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

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.artists, event.previousIndex, event.currentIndex);
  }

}
