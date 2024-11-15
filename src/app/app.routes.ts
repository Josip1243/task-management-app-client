import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/authentication/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/authentication/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/home/about-us/about-us.component').then(
        (m) => m.AboutUsComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/home/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'process',
    loadComponent: () =>
      import('./features/process/process.component').then(
        (m) => m.ProcessComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./features/process/process-list/process-list.component').then(
            (m) => m.ProcessListComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './features/process/process-create/process-create.component'
          ).then((m) => m.ProcessCreateComponent),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import(
            './features/process/process-detail/process-detail.component'
          ).then((m) => m.ProcessDetailComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/process/process-edit/process-edit.component').then(
            (m) => m.ProcessEditComponent
          ),
      },
    ],
  },
  {
    path: 'task',
    loadComponent: () =>
      import('./features/task/task.component').then((m) => m.TaskComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./features/task/task-list/task-list.component').then(
            (m) => m.TaskListComponent
          ),
      },
      {
        path: 'create/:processId',
        loadComponent: () =>
          import('./features/task/task-create/task-create.component').then(
            (m) => m.TaskCreateComponent
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./features/task/task-detail/task-detail.component').then(
            (m) => m.TaskDetailComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/task/task-edit/task-edit.component').then(
            (m) => m.TaskEditComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
