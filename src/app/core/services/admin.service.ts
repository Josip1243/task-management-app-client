import { Injectable } from '@angular/core';
import { UserDTO } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { Task } from '../../shared/models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:5297/';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl + `api/admin/users`);
  }

  public assignAdmin(email: string): Observable<boolean> {
    const body = { userEmail: email };
    return this.http.post<boolean>(
      this.baseUrl + `api/admin/assign-admin`,
      body
    );
  }

  public removeAdmin(email: string): Observable<boolean> {
    const body = { userEmail: email };
    return this.http.post<boolean>(
      this.baseUrl + `api/admin/remove-admin`,
      body
    );
  }

  public removeUser(email: string): Observable<boolean> {
    const body = { userEmail: email };
    return this.http.delete<boolean>(this.baseUrl + `api/admin/remove-user`, {
      body,
    });
  }
}
