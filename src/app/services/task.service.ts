import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Task } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private http: HttpClient) {
  }

  addNewTask(task: Task) {
    return this.http.post(`${ environment.host }/api/v1/tasks`, task);
  }
}
