import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BeautyLogger } from '../../../shared/beauty-logger';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { BaseResponse, DomainTask, TasksResponse, TaskT } from '../../../shared/types';

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
      .pipe(map((res) => res.items))
      // .subscribe((res) => this.tasks$.next(res));
      .subscribe((res) => {
        const stateTasks = this.tasks$.getValue();
        stateTasks[todolistId] = res;
        this.tasks$.next(stateTasks);
      });
  }
  addTask(data: { todoId: string; title: string }) {
    this.http
      .post<BaseResponse<{ item: TaskT }>>(`${this.httpAddress}/${data.todoId}/tasks`, {
        title: data.title,
      })
      .pipe(map((res) => res.data.item))
      .subscribe((res) => {
        const stateTasks = this.tasks$.getValue();
        stateTasks[data.todoId] = [res, ...stateTasks[data.todoId]];
        this.tasks$.next(stateTasks);
      });
  }
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.beautyLogger.log(error.message, 'error');
    return EMPTY;
  }
}
