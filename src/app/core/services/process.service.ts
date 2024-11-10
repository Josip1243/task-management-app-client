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
    //return this.http.get<Process>(this.baseUrl + `api/projects/${id}`);

    const mockData: Process = {
      id: 1,
      name: 'Proc1',
      description: 'Test',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-10'),
    };

    return of(mockData).pipe(delay(1000));
  }

  public getProcesses(): Observable<Process[]> {
    //return this.http.get<Process[]>(this.baseUrl + 'api/projects');

    const mockData: Process[] = [
      {
        id: 1,
        name: 'Proc1',
        description: 'Test',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-10'),
      },
      {
        id: 2,
        name: 'Proc2',
        description: 'Test',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-10'),
      },
      {
        id: 3,
        name: 'Proc3',
        description: 'Test',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-10'),
      },
    ];
    return of(mockData).pipe(delay(1000));
  }

  public createProcess(process: ProcessDTO) {
    return this.http.post(this.baseUrl + 'api/projects/create', process);
  }

  public updateProcess(id: number, process: ProcessDTO) {
    return this.http.put(this.baseUrl + `api/projects/update/${id}`, process);
  }

  public deleteProcess(id: number) {
    return this.http.delete(this.baseUrl + `api/projects/update/${id}`);
  }
}
