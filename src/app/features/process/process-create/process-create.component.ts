import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProcessDTO } from '../../../shared/models/process.model';
import { CommonModule } from '@angular/common';
import { ProcessService } from '../../../core/services/process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-create',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './process-create.component.html',
  styleUrl: './process-create.component.scss',
})
export class ProcessCreateComponent {
  processForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private processService: ProcessService,
    private router: Router
  ) {
    this.processForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.processForm.valid) {
      const process: ProcessDTO = this.processForm.value;
      this.processService.createProcess(process).subscribe({
        next: (proc) => {
          this.router.navigate(['process/list']);
        },
      });
    }
  }
}
