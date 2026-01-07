import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
import { TodolistT } from '../../../shared/types';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BeautyLogger } from '../../../shared/beauty-logger';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  todolists$: BehaviorSubject<TodolistT[]> = new BehaviorSubject<TodolistT[]>([]);
  httpAddress = `${environment.baseUrl}/1.1/todo-lists`;

  private http = inject(HttpClient);
  private beautyLogger = inject(BeautyLogger);

  getTodolists() {
    this.http
      .get<TodolistT[]>(`${this.httpAddress}`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((todos) => {
        this.todolists$.next(todos);
      });
  }
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.beautyLogger.log(error.message, 'error');
    return EMPTY;
  }
}
