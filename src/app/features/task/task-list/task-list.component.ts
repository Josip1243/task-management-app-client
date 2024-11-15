import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from '../../../shared/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  isAdmin: boolean = false;
  displayedColumns: string[] = [
    'name',
    'description',
    'dueDate',
    'isCompleted',
  ];
  dataSource = new MatTableDataSource<Task>();
  @ViewChild(MatTable) table!: MatTable<Task>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.dataSource.data = data;
    });
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  showTaskDetails(id: number) {
    this.router.navigate([`task/detail/${id}`]);
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
