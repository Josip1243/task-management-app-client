import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  // animations: [
  //   trigger('fadeIn', [
  //     transition(':enter', [
  //       style({ opacity: 0 }), // Start with opacity 0
  //       animate('5000ms', style({ opacity: 1 })), // Fade to opacity 1
  //     ]),
  //   ]),
  // ],
})
export class NavbarComponent {}
