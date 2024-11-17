import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProcessService } from '../../../core/services/process.service';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Process } from '../../../shared/models/process.model';
import { Task } from '../../../shared/models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-process-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './process-detail.component.html',
  styleUrl: './process-detail.component.scss',
})
export class ProcessDetailComponent implements OnInit, AfterViewInit {
  process?: Process;
  //tasks!: Task[];
  dataSource = new MatTableDataSource<Task>();
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'description',
    'isCompleted',
    'dueDate',
    'assignedUsers',
    'actions',
  ];

  constructor(
    private processService: ProcessService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let processId = Number(params.get('id')!);
      if (processId) {
        this.loadProcessData(processId);
      }
    });
  }

  ngAfterViewInit(): void {
    debugger;
    this.dataSource.paginator = this.paginator;
  }

  loadProcessData(id: number): void {
    this.processService.getProcess(id).subscribe({
      next: (process: Process) => {
        this.process = process;
      },
      error: (err) => {
        console.error('Error fetching process data', err);
      },
    });
    this.taskService.getProjectTasks(id).subscribe({
      next: (tasks: Task[]) => {
        this.dataSource.data = tasks;
      },
      error: (err) => {
        console.error('Error fetching process tasks', err);
      },
    });
  }

  showTaskDetail(id: number) {
    this.router.navigate([`task/detail/${id}`]);
  }

  addTaskButtonClick() {
    this.router.navigate([`task/create/${this.process?.id}`]);
  }

  editTask(id: number) {
    this.router.navigate([`task/edit/${id}`]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        let temp = this.dataSource.data.filter((p) => p.id !== id);
        this.dataSource.data = temp;
        this.table.renderRows();
        console.log('Deleted');
      },
    });
  }
}
