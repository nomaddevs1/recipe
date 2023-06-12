import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface Auth {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export default class AuthService implements OnInit {
  user = new BehaviorSubject<User>(null); //Behavior subject gives access to the old value even if the user is logging after that val
  token = null;
  private tokenExpiration: any
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {}
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return
    }
    const loadUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadUser.token) {
      this.user.next(loadUser);
      const expirationDate = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime()
      this.autoLogout(expirationDate)
    }
  }
  autoLogout(expirationDuration: number){
   this.tokenExpiration= setTimeout(()=>{
      this.logout()
    }, expirationDuration)
  }
  login(email: string, password: string) {
    return this.http
      .post<Auth>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCU7YeKapZ5vMzvs7BFbbLfV7wDq1A7iuI',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  signUp(email: string, password: string) {
    return this.http
      .post<Auth>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCU7YeKapZ5vMzvs7BFbbLfV7wDq1A7iuI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      ); //tap allow us to perform action without changing response data;
  }
  logout() {
    this.router.navigate(['/auth']);
    this.user.next(null);
    localStorage.removeItem('user');
    if(this.tokenExpiration){
      clearTimeout(this.tokenExpiration);
    }
    this.tokenExpiration = null
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user)
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email address already exists';
      case 'INVALID_PASSWORD':
        errorMessage = 'The Password provided is false';
    }
    return throwError(errorMessage);
  }
}
