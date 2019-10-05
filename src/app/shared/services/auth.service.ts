import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public error$: Subject<string> = new Subject<string>();
  private currentUser: User;

  constructor(
    private http: HttpClient
  ) {
  }

  set user(user: User) {
    this.currentUser = user;
  }

  get user() {
    return this.currentUser;
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.setToken(null);
      return null;
    }
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    return this.http.get(`${ environment.host }/api/v1/auth/user`);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${ environment.host }/api/v1/auth/signup`, user)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${ environment.host }/api/v1/auth/signin`, user)
      .pipe(
        tap(this.setToken),
        tap(response => this.user = response),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    return this.http.get(`${environment.host}/api/v1/auth/logout`)
      .pipe(
        tap(this.setToken),
        tap(response => this.user = response)
      );
  }

  isAuth(): boolean {
    return !!this.token;
  }

  requestNewEmail(id: number) {
    return this.http.post(`${ environment.host }/api/v1/auth/new-email`, { id });
  }

  setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(response.auth_key.exp * 1000);
      localStorage.setItem('token', response.auth_key.id);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const message = error.error.errors[0].message;
    this.error$.next(message);
    return throwError(error);
  }

  socialAuth(socialUser): Observable<any> {
    return this.http.post(`${ environment.host }/api/v1/auth/social-auth`, socialUser)
      .pipe(
        tap(this.setToken),
        tap(response => this.user = response)
      );
  }
}
