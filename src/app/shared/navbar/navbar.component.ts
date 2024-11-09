import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.isLogged.subscribe((logged) => {
    //   this.isLoggedIn = logged;
    // });
    // this.authService.checkStatus();
  }
}
