import { Routes } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/home/about-us/about-us/about-us.component';
import { ContactComponent } from './features/home/contact/contact/contact.component';
import { ProcessListComponent } from './features/process/process-list/process-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProcessDetailComponent } from './features/process/process-detail/process-detail.component';
import { ProcessComponent } from './features/process/process.component';
import { TaskComponent } from './features/task/task.component';
import { TaskListComponent } from './features/task/task-list/task-list.component';
import { TaskDetailComponent } from './features/task/task-detail/task-detail.component';
import { ProcessCreateComponent } from './features/process/process-create/process-create.component';
import { TaskCreateComponent } from './features/task/task-create/task-create.component';
import path from 'node:path';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'process',
    component: ProcessComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'list', component: ProcessListComponent },
      { path: 'create', component: ProcessCreateComponent },
      { path: 'detail/:id', component: ProcessDetailComponent },
    ],
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'list', component: TaskListComponent },
      { path: 'create', component: TaskCreateComponent },
      { path: 'detail/:id', component: TaskDetailComponent },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
