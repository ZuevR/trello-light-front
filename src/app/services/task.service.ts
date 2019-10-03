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

  moveTask(tasks: Task[]) {
    return this.http.post(`${ environment.host }/api/v1/tasks/moved`, tasks);
  }

  changeTaskTitle(task: Task) {
    return this.http.post(`${ environment.host }/api/v1/tasks/rename`, { task });
  }

  removeTask(id: string) {
    return this.http.delete(`${ environment.host }/api/v1/tasks/${ id }`);
  }

  changeTaskDescription(task: Task) {
    return this.http.patch(`${ environment.host }/api/v1/tasks/description`, task);
  }
}
