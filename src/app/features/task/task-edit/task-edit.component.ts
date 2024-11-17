import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { UserDTO } from '../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from '../../../core/services/process.service';
import { TaskService } from '../../../core/services/task.service';
import {
  TaskDTO,
  CreateTaskDTO,
  EditTaskDTO,
} from '../../../shared/models/task.model';
import { AdminService } from '../../../core/services/admin.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-task-edit',
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
    FormsModule,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  task!: TaskDTO;
  allUsers!: UserDTO[];
  selectedEmails!: string[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackbarService
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
    const taskId = Number(this.route.snapshot.paramMap.get('id'));

    this.adminService.getUsers().subscribe({
      next: (allUsers: UserDTO[]) => {
        this.allUsers = allUsers;
        this.fillForm(taskId);
      },
      error: (err) => {
        console.error('Error fetching all users list', err);
      },
    });
  }

  private fillForm(taskId: number) {
    this.taskService.getTask(taskId).subscribe({
      next: (task: TaskDTO) => {
        this.task = task;
        this.selectedEmails = task.assignedUserIds;

        this.taskForm.patchValue({
          name: task.name,
          description: task.description,
          dueDate: task.dueDate,
          assignedUserIds: this.selectedEmails,
          isCompleted: task.isCompleted,
        });
      },
      error: (err) => {
        console.error('Error editing task', err);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: EditTaskDTO = this.taskForm.value;
      this.taskService.updateTask(this.task.id, task).subscribe({
        next: () => {
          //this.router.navigate(['task/list']);
          this.snackBarService.showSnackbar(
            'Sucessfully updated Task!',
            'success'
          );
        },
        error: () => {
          this.snackBarService.showSnackbar('Failed to update Task!', 'error');
        },
      });
    }
  }
}
