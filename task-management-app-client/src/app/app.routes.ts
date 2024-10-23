import { Routes } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/home/about-us/about-us/about-us.component';
import { ContactComponent } from './features/home/contact/contact/contact.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
