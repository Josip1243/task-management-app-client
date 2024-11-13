import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Process, ProcessDTO } from '../../shared/models/process.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  baseUrl = 'http://localhost:5297/';

  constructor(private http: HttpClient) {}

  getProcess(id: number): Observable<Process> {
    return this.http.get<Process>(
      this.baseUrl + `api/project/getproject/${id}`
    );
  }

  public getProcesses(): Observable<Process[]> {
    return this.http.get<Process[]>(this.baseUrl + 'api/project/getprojects');
  }

  public createProcess(process: ProcessDTO) {
    return this.http.post(this.baseUrl + 'api/project/create', process);
  }

  public updateProcess(id: number, process: ProcessDTO): Observable<Process> {
    return this.http.put<Process>(
      this.baseUrl + `api/project/update/${id}`,
      process
    );
  }

  public deleteProcess(id: number) {
    return this.http.delete(this.baseUrl + `api/project/delete/${id}`);
  }
}
