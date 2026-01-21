import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BeautyLogger } from '../../../shared/beauty-logger';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import {
  BaseResponse,
  DomainTask,
  TasksResponse,
  TaskT,
  UpdateTaskModel,
} from '../../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$ = new BehaviorSubject<DomainTask>({});
  httpAddress = `${environment.baseUrl}/1.1/todo-lists`;

  private http = inject(HttpClient);
  private beautyLogger = inject(BeautyLogger);

  getTasks(todolistId: string) {
    this.http
      .get<TasksResponse>(`${this.httpAddress}/${todolistId}/tasks`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(
        map((res) => {
          const stateTasks = this.tasks$.getValue();
          stateTasks[todolistId] = res.items;
          return stateTasks;
        }),
      )
      .subscribe((res) => {
        this.tasks$.next(res);
      });
  }
  addTask(data: { todoId: string; title: string }) {
    this.http
      .post<BaseResponse<{ item: TaskT }>>(`${this.httpAddress}/${data.todoId}/tasks`, {
        title: data.title,
      })
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(
        map((res) => {
          const stateTasks = this.tasks$.getValue();
          stateTasks[data.todoId] = [res.data.item, ...stateTasks[data.todoId]];
          return stateTasks;
        }),
      )
      .subscribe((res) => {
        this.tasks$.next(res);
      });
  }
  removeTask(todoId: string, taskId: string) {
    this.http
      .delete<BaseResponse>(`${this.httpAddress}/${todoId}/tasks/${taskId}`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue();
          stateTasks[todoId] = stateTasks[todoId].filter((task) => task.id !== taskId);
          return stateTasks;
        }),
      )
      .subscribe((res) => {
        this.tasks$.next(res);
      });
  }
  updateTask(data: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    this.http
      .put<BaseResponse<{ item: TaskT }>>(
        `${this.httpAddress}/${data.todolistId}/tasks/${data.taskId}`,
        data.model,
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue();
          stateTasks[data.todolistId] = stateTasks[data.todolistId].map((t) =>
            t.id === data.taskId ? { ...t, ...data.model } : t,
          );
          return stateTasks;
        }),
      )
      .subscribe((res) => this.tasks$.next(res));
  }
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.beautyLogger.log(error.message, 'error');
    return EMPTY;
  }
}
