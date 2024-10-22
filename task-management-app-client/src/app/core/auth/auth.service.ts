import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string) {
    console.log('Logging in...');
    return { success: true };
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatedPassword: string
  ) {
    console.log('Registering...');
    return { success: true };
  }
}
