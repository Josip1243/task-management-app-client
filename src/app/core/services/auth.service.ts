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
  private usernameBehaviorSubject = new BehaviorSubject<string>('');
  private userIdBehaviorSubject = new BehaviorSubject<number>(-1);
  username = this.usernameBehaviorSubject.asObservable();
  userId = this.userIdBehaviorSubject.asObservable();

  private fakeToken = '1234567890abcdef';

  constructor(private http: HttpClient, private router: Router) {}

  public register(user: RegisterUser): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/register', user);

    // // For developing
    // if (user.email === 'test@test' && user.password === 'test') {
    // }
    // return of(this.fakeToken).pipe(delay(1000));
  }

  public login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Auth/login', user).pipe(
      tap(() => {
        this.logged.next(true);
      })
    );

    // For developing
    // if (user.email === 'test@test' && user.password === 'test') {
    //   return of(this.fakeToken).pipe(delay(1000));
    // }
    // const error = { status: 401, message: 'Invalid username or password' };
    // return throwError(error).pipe(delay(1000));
  }

  public logout(page: string) {
    localStorage.clear();
    this.logged.next(false);
    this.router.navigate([page]);
  }

  checkStatus() {
    if (localStorage.getItem('token')) {
      this.logged.next(true);
    } else {
      this.logged.next(false);
      return;
    }

    if (this.getAccessToken()) {
      let token = this.decodedToken();
      // let username =
      //   token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      // let userId = Number(token['Id']);
      // this.usernameBehaviorSubject.next(username);
      // this.userIdBehaviorSubject.next(userId);
    }
  }

  isAdmin() {
    if (!this.roleExists()) {
      return false;
    }

    let role = localStorage.getItem('role');
    if (role === 'admin') {
      return true;
    }
    return false;
  }

  isWorker() {
    if (!this.roleExists()) {
      return false;
    }

    let role = localStorage.getItem('role');
    if (role === 'worker') {
      return true;
    }
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
  }
  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getAccessToken()!;
    return jwtHelper.decodeToken(token);
  }

  public refreshToken(tokenDTO: TokenDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(
      this.baseUrl + 'api/auth/refresh-token',
      tokenDTO
    );
  }

  public getMe(): Observable<string> {
    return this.http.get(this.baseUrl + 'api/auth/GetMe', {
      responseType: 'text',
    });
  }
}
