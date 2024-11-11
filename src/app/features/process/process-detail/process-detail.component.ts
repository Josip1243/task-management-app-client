import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../../core/services/process.service';
import { TaskService } from '../../../core/services/task.service';
import { Router } from '@angular/router';
import { Process } from '../../../shared/models/process.model';
import { Task } from '../../../shared/models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './process-detail.component.html',
  styleUrl: './process-detail.component.scss',
})
export class ProcessDetailComponent implements OnInit {
  process: Process = {
    id: 1,
    name: 'Project Launch',
    description:
      'This process includes all steps needed for launching the project.',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-01-15'),
  };

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

  displayedColumns: string[] = [
    'name',
    'description',
    'isCompleted',
    'dueDate',
    'assignedUsers',
  ];

  constructor(
    private processService: ProcessService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showTaskDetail(id: number) {
    this.router.navigate([`task/detail/${id}`]);
  }
}
