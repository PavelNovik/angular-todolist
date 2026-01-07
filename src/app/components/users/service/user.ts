import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BeautyLogger } from '../../../shared/beauty-logger';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { UserResponse, UserT } from '../../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class User {
  httpAddress = `${environment.baseUrl}/1.0`;
  private http = inject(HttpClient);
  private beautyLogger = inject(BeautyLogger);

  getUsers(page: number): Observable<UserT[]> {
    return this.http
      .get<UserResponse>(`${this.httpAddress}/users?page=${page}`)
      .pipe(map((res) => res.items))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.beautyLogger.log(error.message, 'error');
    return EMPTY;
  }
}
