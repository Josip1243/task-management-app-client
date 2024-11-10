import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Process, ProcessDTO } from '../../../shared/models/process.model';
import { ProcessService } from '../../../core/services/process.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-process-edit',
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
  templateUrl: './process-edit.component.html',
  styleUrl: './process-edit.component.scss',
})
export class ProcessEditComponent implements OnInit {
  processForm: FormGroup;
  processId!: number;

  constructor(
    private fb: FormBuilder,
    private processService: ProcessService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.processForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.processId = Number(params.get('id')!);
      if (this.processId) {
        this.loadProcessData(this.processId);
      }
    });
  }

  loadProcessData(id: number): void {
    this.processService.getProcess(id).subscribe({
      next: (process: Process) => {
        this.processForm.patchValue({
          name: process.name,
          description: process.description,
          startDate: process.startDate,
          endDate: process.endDate,
        });
      },
      error: (err) => {
        console.error('Error fetching process data', err);
      },
    });
  }

  onSubmit() {
    if (this.processForm.valid) {
      const process: ProcessDTO = this.processForm.value;
      this.processService.updateProcess(this.processId, process).subscribe({
        next: () => {
          this.router.navigate(['process/list']);
        },
      });
    }
  }
}
