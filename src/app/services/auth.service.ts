import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BaseResponse, MeResponse } from '../shared/types';
import { ResultCodes } from '../enums/resultCode.enum';
import { Router } from '@angular/router';

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
  isAuth = false;

  // isAuth$ = new BehaviorSubject<boolean>(false);

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${this.httpAddress}/login`, data)
      .subscribe((response) => {
        if (response.resultCode === ResultCodes.success) {
          this.router.navigate(['/']);
          // this.isAuth$.next(true);
          this.isAuth = true;
        }
      });
  }
  logout() {
    this.http.delete<BaseResponse>(`${this.httpAddress}/login`).subscribe((response) => {
      if (response.resultCode === ResultCodes.success) {
        this.router.navigate(['/login']);
        // this.isAuth$.next(false);
        this.isAuth = false;
      }
    });
  }
  me() {
    this.http.get<BaseResponse<MeResponse>>(`${this.httpAddress}/me`).subscribe((res) => {
      if (res.resultCode === ResultCodes.success) {
        // this.isAuth$.next(true);
        this.isAuth = true;
      }
    });
  }
}
