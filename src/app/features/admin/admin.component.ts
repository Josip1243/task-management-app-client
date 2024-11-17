import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserDTO } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { AdminService } from '../../core/services/admin.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Task } from '../../shared/models/task.model';

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
    MatPaginatorModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'username',
    'email',
    'role',
    'actions',
  ];
  roles: string[] = ['Admin', 'User'];
  dataSource = new MatTableDataSource<UserDTO>();
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe({
      next: (users: UserDTO[]) => {
        this.dataSource.data = users;
      },
      error: (err) => {
        console.log('Error fetching users', err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Method to change user role
  changeRole(user: UserDTO, newRole: string): void {
    if (newRole === 'Admin') {
      this.adminService.assignAdmin(user.email).subscribe({
        next: (changed: boolean) => {
          if (changed) {
            user.roles.pop();
            user.roles.push(newRole);
          }
        },
        error: (err) => {
          console.log('Error fetching users', err);
        },
      });
    } else {
      this.adminService.removeAdmin(user.email).subscribe({
        next: (changed: boolean) => {
          if (changed) {
            user.roles.pop();
            user.roles.push(newRole);
          }
        },
        error: (err) => {
          console.log('Error fetching users', err);
        },
      });
    }
  }

  // Method to delete user
  deleteUser(user: UserDTO): void {
    this.adminService.removeUser(user.email).subscribe({
      next: (deleted: boolean) => {
        if (deleted) {
          this.dataSource.data = this.dataSource.data?.filter(
            (u) => u.email != user.email
          );
        }
      },
      error: (err) => {
        console.log('Error removing user', err);
      },
    });
  }
}
