import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  title = 'About Us';
  description =
    'We are a dedicated team committed to providing the best task management solutions. Our goal is to help teams collaborate effectively and achieve their objectives efficiently.';
}
