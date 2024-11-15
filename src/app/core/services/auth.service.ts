import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  delay,
  empty,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { RegisterUser, User } from '../../shared/models/user.model';
import { TokenDTO } from '../../shared/models/tokenDTO.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5297/';

  private logged = new BehaviorSubject<boolean>(false);
  isLogged = this.logged.asObservable();
  private admin = new BehaviorSubject<boolean>(false);
  isAdminObservable = this.admin.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public register(user: RegisterUser): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/register', user);
  }

  public login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Auth/login', user).pipe(
      tap(() => {
        this.logged.next(true);
      })
    );
  }

  public logout(page: string) {
    localStorage.clear();
    this.logged.next(false);
    this.router.navigate([page]);
    window.location.reload();
  }

  checkStatus() {
    if (localStorage.getItem('token')) {
      this.isAdmin();
      this.logged.next(true);
    } else {
      this.logged.next(false);
      return;
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    if (!this.roleExists()) {
      return false;
    }

    let role = localStorage.getItem('role');
    if (role === 'Admin') {
      this.admin.next(true);
      return true;
    }
    this.admin.next(false);
    return false;
  }

  private roleExists() {
    if (localStorage.getItem('role')) {
      return true;
    }
    return false;
  }

  storeAccessToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    let token = this.getDecodedToken();
    let role =
      token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('role', role);
  }
  getAccessToken() {
    return localStorage.getItem('token');
  }
  getDecodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getAccessToken()!;
    return jwtHelper.decodeToken(token);
  }
}
