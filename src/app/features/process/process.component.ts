import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent implements OnInit {
  isOwner: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isOwner = this.authService.isOwner();
  }
}
