import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Process, ProcessDTO } from '../../shared/models/process.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  baseUrl = 'http://localhost:5297/';

  mockData: Process[] = [
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
    {
      id: 4,
      name: 'Proc4',
      description: 'Test',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-10'),
    },
    {
      id: 5,
      name: 'Proc5',
      description: 'Test',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-10'),
    },
  ];

  counter = this.mockData.length;

  constructor(private http: HttpClient) {}

  getProcess(id: number): Observable<Process> {
    //return this.http.get<Process>(this.baseUrl + `api/projects/${id}`);

    return of(this.mockData.find((p) => p.id == id)!);
  }

  public getProcesses(): Observable<Process[]> {
    //return this.http.get<Process[]>(this.baseUrl + 'api/projects');

    return of(this.mockData);
  }

  public createProcess(process: ProcessDTO) {
    //return this.http.post(this.baseUrl + 'api/projects/create', process);

    this.counter++;
    let newProcess = {
      id: this.counter,
      name: process.name,
      description: process.description,
      startDate: process.startDate,
      endDate: process.endDate,
    };
    this.mockData.push(newProcess);

    return of(newProcess);
  }

  public updateProcess(id: number, process: ProcessDTO): Observable<Process> {
    //return this.http.put(this.baseUrl + `api/projects/update/${id}`, process);

    let temp = this.mockData.find((p) => p.id == id)!;
    temp.name = process.name;
    return of(temp);
  }

  public deleteProcess(id: number) {
    //return this.http.delete(this.baseUrl + `api/projects/update/${id}`);

    this.mockData = this.mockData.filter((p) => p.id !== id);
    console.log(this.mockData);
    return of();
  }
}
