import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { BaseResponse, TodolistT } from '../../../shared/types';
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
  addTodolist(title: string) {
    this.http
      .post<BaseResponse<{ item: TodolistT }>>(`${this.httpAddress}`, { title })
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(
        map((res) => {
          const stateTodo = this.todolists$.getValue();
          const newTodo = res.data.item;
          return [newTodo, ...stateTodo];
        }),
      )
      .subscribe((res) => {
        this.todolists$.next(res);
      });
  }

  removeTodo(todoId: string) {
    this.http
      .delete<BaseResponse>(`${this.httpAddress}/${todoId}`)
      .pipe(
        map(() => {
          const stateTodo = this.todolists$.getValue();
          return stateTodo.filter((tl) => tl.id !== todoId);
        }),
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        this.todolists$.next(res);
      });
  }
  updateTodoTitle(data: { id: string; newTitle: string }): void {
    this.http
      .put<BaseResponse>(`${this.httpAddress}/${data.id}`, { title: data.newTitle })
      .pipe(
        map(() => {
          const stateTodo = this.todolists$.getValue();
          return stateTodo.map((tl) => {
            return tl.id === data.id ? { ...tl, title: data.newTitle } : tl;
          });
        }),
      )
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
