import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  features = [
    {
      icon: 'task_alt',
      title: 'Task Management',
      description: 'Effortlessly manage tasks and prioritize your work.',
    },
    {
      icon: 'sync',
      title: 'Real-Time Updates',
      description: 'Stay updated with live tracking and notifications.',
    },
    {
      icon: 'group',
      title: 'Collaboration',
      description: 'Empower teamwork with shared boards and progress updates.',
    },
  ];

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
