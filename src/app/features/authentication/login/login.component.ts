import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (tokenDTO) => {
          this.loginForm.reset();
          this.authService.storeAccessToken(tokenDTO.token);
          this.authService.isAdmin();
          this.router.navigateByUrl('home');
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'An unexpected error occurred';
          }
          console.error('Login failed:', this.errorMessage);
        },
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.touched && control.invalid) {
      if (control?.hasError('required')) {
        return `${
          controlName.charAt(0).toUpperCase() + controlName.slice(1)
        } is required.`;
      } else if (control?.hasError('email')) {
        return `Must be a correct email format: "example@example.com"`;
      }
    }
    return '';
  }
}
