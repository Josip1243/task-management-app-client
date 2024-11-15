import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskDTO } from '../../../shared/models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  task?: TaskDTO;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(taskId).subscribe({
      next: (task: TaskDTO) => {
        this.task = task;
      },
      error: (err) => {
        console.error('Error fetching task details', err);
      },
    });
  }

  toggleTaskCompletion(): void {
    if (this.task) {
      this.task.isCompleted = !this.task.isCompleted;
      this.taskService.updateTask(this.task.id, this.task).subscribe({
        next: () => {
          console.log('AAAAAA');
        },
        error: (err) => {
          console.error('Error updating task status', err);
        },
      });
    }
  }
}
