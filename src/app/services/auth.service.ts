import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BaseResponse, MeResponse } from '../shared/types';
import { ResultCodes } from '../enums/resultCode.enum';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { BeautyLogger } from '../shared/beauty-logger';
import { Notification } from '../shared/notification';

export type LoginRequestData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpAddress = `${environment.baseUrl}/1.1/auth`;
  private http = inject(HttpClient);
  private router = inject(Router);
  private beautyLogger = inject(BeautyLogger);
  private notificationService = inject(Notification);
  isAuth = false;

  // isAuth$ = new BehaviorSubject<boolean>(false);

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${this.httpAddress}/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((response) => {
        if (response.resultCode === ResultCodes.success) {
          this.router.navigate(['/']);
          // this.isAuth$.next(true);
          this.isAuth = true;
        }
      });
  }
  logout() {
    this.http
      .delete<BaseResponse>(`${this.httpAddress}/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((response) => {
        if (response.resultCode === ResultCodes.success) {
          this.router.navigate(['/login']);
          // this.isAuth$.next(false);
          this.isAuth = false;
        }
      });
  }
  me() {
    this.http
      .get<BaseResponse<MeResponse>>(`${this.httpAddress}/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        if (res.resultCode === ResultCodes.success) {
          // this.isAuth$.next(true);
          this.isAuth = true;
        }
      });
  }
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.notificationService.handleError(error.message);
    return EMPTY;
  }
}
