import { Component } from '@angular/core';
import { UserDTO } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  users: UserDTO[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      role: 'User',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      role: 'Admin',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      username: 'alicej',
      email: 'alice@example.com',
      role: 'User',
    },
    // Add more users as needed
  ];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'username',
    'email',
    'role',
    'actions',
  ];
  roles: string[] = ['User', 'Admin', 'Manager']; // List of available roles

  // Method to change user role
  changeRole(user: UserDTO, newRole: string): void {
    user.role = newRole;
  }

  // Method to delete user
  deleteUser(user: UserDTO): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }
}
