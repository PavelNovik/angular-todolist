import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BeautyLogger } from '../../../shared/beauty-logger';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { TasksResponse } from '../../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // tasks$: BehaviorSubject<TaskT[]> = new BehaviorSubject<TaskT[]>([]);
  httpAddress = `${environment.baseUrl}/1.1/todo-lists`;

  private http = inject(HttpClient);
  private beautyLogger = inject(BeautyLogger);

  getTasks(todolistId: string) {
    return this.http
      .get<TasksResponse>(`${this.httpAddress}/${todolistId}/tasks`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(map((res) => res.items));
    // .subscribe((res) => this.tasks$.next(res.items));
  }
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.beautyLogger.log(error.message, 'error');
    return EMPTY;
  }
}
