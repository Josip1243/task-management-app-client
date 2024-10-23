import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeatedPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, repeatedPassword } =
        this.registerForm.value;
      this.authService.register(
        firstName,
        lastName,
        email,
        password,
        repeatedPassword
      );
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.touched && control.invalid) {
      if (control?.hasError('required')) {
        return `${
          controlName.charAt(0).toUpperCase() + controlName.slice(1)
        } is required.`;
      } else if (control?.hasError('email')) {
        return `Must be a correct email format: "example@example.com"`;
      } else if (control?.hasError('passwordMismatch')) {
        return `Passwords do not match.`;
      }
    }
    return '';
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const password = formGroup.get('password')?.value;
      const confirmPasswordControl = formGroup.get('repeatedPassword');

      if (!confirmPasswordControl) {
        return null;
      }

      if (password !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
