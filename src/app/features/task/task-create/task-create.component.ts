import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CreateTaskDTO,
  Task,
  TaskDTO,
} from '../../../shared/models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserDTO } from '../../../shared/models/user.model';
import { ProcessService } from '../../../core/services/process.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  processId!: number;
  users!: UserDTO[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private processService: ProcessService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedUserIds: [[], Validators.required],
      isCompleted: [false],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let processId = Number(params.get('processId')!);
      if (processId) {
        this.processId = processId;
      }
    });

    this.processService.getProcessUsers(this.processId).subscribe({
      next: (users: UserDTO[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching project users', err);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: CreateTaskDTO = {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        createdAt: new Date(),
        dueDate: this.taskForm.value.dueDate,
        projectId: this.processId,
        assignedUserIds: this.taskForm.value.assignedUserIds,
      };
      this.taskService.createTask(newTask).subscribe({
        next: (newTask) => {
          this.router.navigate([`process/detail/${this.processId}`]);
        },
      });
      this.taskForm.reset();
    }
  }
}
