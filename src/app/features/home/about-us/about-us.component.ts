import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  team = [
    {
      name: 'Ivan Matic',
      role: 'CEO & Founder',
      image: '/assets/images/person.jpg',
    },
    {
      name: 'Josip Radman',
      role: 'CTO & Founder',
      image: '/assets/images/person.jpg',
    },
  ];
  values = [
    {
      icon: 'integrity',
      title: 'Integrity',
      description:
        'We uphold the highest standards of honesty and transparency.',
    },
    {
      icon: 'innovation',
      title: 'Innovation',
      description: 'We constantly innovate to make task management easier.',
    },
    {
      icon: 'teamwork',
      title: 'Teamwork',
      description: 'Collaboration is at the heart of what we do.',
    },
  ];
}
