import { Component, inject, input, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Observable } from 'rxjs';
import { TaskT } from '../../../../shared/types';
import { AsyncPipe } from '@angular/common';
import { Task } from './task/task';

@Component({
  selector: 'tl-tasks',
  imports: [AsyncPipe, Task],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  readonly todolistId = input.required<string>();
  tasks$!: Observable<TaskT[]>;
  private taskService = inject(TaskService);
  ngOnInit() {
    this.tasks$ = this.taskService.getTasks(this.todolistId());
    // this.tasks$ = this.taskService.tasks$;
    console.log(this.tasks$);
  }
}
