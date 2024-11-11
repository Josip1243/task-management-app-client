import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../shared/models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

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
  task: Task | undefined;

  tasks: Task[] = [
    {
      id: 1,
      name: 'Design UI',
      description: 'Create UI for the project',
      isCompleted: false,
      dueDate: new Date('2024-11-20'),
      assignedUserIds: ['user1'],
    },
    {
      id: 2,
      name: 'Develop Backend',
      description: 'Set up the server and database',
      isCompleted: true,
      dueDate: new Date('2024-12-05'),
      assignedUserIds: ['user2', 'user3'],
    },
    {
      id: 3,
      name: 'Testing',
      description: 'Test all functionalities',
      isCompleted: false,
      dueDate: new Date('2024-12-20'),
      assignedUserIds: ['user4'],
    },
    {
      id: 4,
      name: 'Deploy',
      description: 'Deploy the project to the production server',
      isCompleted: false,
      dueDate: new Date('2025-01-10'),
      assignedUserIds: ['user5'],
    },
    {
      id: 5,
      name: 'QA Review',
      description: 'Quality assurance and final checks',
      isCompleted: false,
      dueDate: new Date('2025-01-12'),
      assignedUserIds: ['user6'],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.tasks.find((task) => task.id === taskId);
  }

  toggleTaskCompletion(): void {
    if (this.task) {
      this.task.isCompleted = !this.task.isCompleted;
      // Optional: Save updated status to backend or service here
      console.log(
        `Task ${this.task.id} is now ${
          this.task.isCompleted ? 'completed' : 'incomplete'
        }`
      );
    }
  }
}
