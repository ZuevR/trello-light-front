import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Board } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class BoardService {

  constructor(private http: HttpClient) {
  }

  getAllBoards() {
    return this.http.get(`${ environment.host }/api/v1/boards`);
  }

  getBoard(id: string) {
    return this.http.get(`${ environment.host }/api/v1/boards/${ id }`);
  }

  createNewBoard(board: Board) {
    return this.http.post(`${ environment.host }/api/v1/boards`, board);
  }

  changeBoard(board: Board) {
    return this.http.patch(`${ environment.host }/api/v1/boards`, board);
  }

  deleteBoard(id: string) {
    return this.http.delete(`${ environment.host }/api/v1/boards/${ id }`);
  }
}
