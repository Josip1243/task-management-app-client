import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskDTO } from '../../shared/models/task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  mockData: Task[] = [
    {
      id: 1,
      name: 'Design homepage',
      description: 'Create initial wireframes and designs for the homepage',
      isCompleted: false,
      dueDate: new Date('2024-12-01'),
      assignedUserIds: ['user1', 'user2'],
    },
    {
      id: 2,
      name: 'Develop login module',
      description: 'Implement login functionality and integrate OAuth',
      isCompleted: true,
      dueDate: new Date('2024-11-15'),
      assignedUserIds: ['user3'],
    },
    {
      id: 3,
      name: 'Write documentation',
      description: 'Document all API endpoints for the backend service',
      isCompleted: false,
      dueDate: new Date('2024-12-05'),
      assignedUserIds: ['user4', 'user5'],
    },
    {
      id: 4,
      name: 'Setup database',
      description: 'Configure the database schema and set up initial tables',
      isCompleted: false,
      dueDate: new Date('2024-11-20'),
      assignedUserIds: ['user2'],
    },
    {
      id: 5,
      name: 'Testing & QA',
      description: 'Perform quality assurance tests on all modules',
      isCompleted: true,
      dueDate: new Date('2024-11-25'),
      assignedUserIds: ['user1', 'user3'],
    },
  ];
  counter = this.mockData.length;

  baseUrl = 'http://localhost:5297/';

  constructor(private http: HttpClient) {}

  public getTask(id: number): Observable<Task> {
    //return this.http.get<Task>(this.baseUrl + `api/tasks/${id}`);

    return of(this.mockData.find((p) => p.id == id)!);
  }

  public getTasks(): Observable<Task[]> {
    return of(this.mockData);
  }

  public getProjectTasks(): Observable<Task[]> {
    //return this.http.get<Task[]>(this.baseUrl + 'api/tasks');

    return of(this.mockData);
  }

  public createTask(task: TaskDTO): Observable<Task> {
    //return this.http.post(this.baseUrl + 'api/tasks/create', task);

    this.counter++;
    let newTask = {
      id: this.counter,
      name: task.name,
      description: task.description,
      isCompleted: false,
      dueDate: new Date('2024-11-25'),
      assignedUserIds: ['user1', 'user3'],
    };

    return of(newTask);
  }

  public updateTask(id: number, task: TaskDTO): Observable<Task> {
    //return this.http.put(this.baseUrl + `api/tasks/update/${id}`, task);

    let temp = this.mockData.find((t) => t.id !== id);
    console.log(this.mockData);
    return of();
  }

  public deleteTask(id: number) {
    //return this.http.delete(this.baseUrl + `api/tasks/update/${id}`);

    return of();
  }
}
