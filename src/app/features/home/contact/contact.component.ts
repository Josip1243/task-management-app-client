import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  title = 'Contact Us';
  email = 'support@example.com';
  phone = '+1 (234) 567-8900';
}
