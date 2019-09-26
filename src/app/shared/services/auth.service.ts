import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { AuthResponse, User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
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
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  requestNewEmail(id: number) {
    return this.http.post(`${ environment.host }/api/v1/auth/new-email`, { id });
  }

  private setToken(response: AuthResponse | null) {
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
}
