import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskDTO } from '../../shared/models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:5297/';

  constructor(private http: HttpClient) {}

  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.baseUrl + `api/tasks/${id}`);
  }

  public getProjectTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'api/tasks');
  }

  public createTask(task: TaskDTO) {
    return this.http.post(this.baseUrl + 'api/tasks/create', task);
  }

  public updateTask(id: number, task: TaskDTO) {
    return this.http.put(this.baseUrl + `api/tasks/update/${id}`, task);
  }

  public deleteTask(id: number) {
    return this.http.delete(this.baseUrl + `api/tasks/update/${id}`);
  }
}
