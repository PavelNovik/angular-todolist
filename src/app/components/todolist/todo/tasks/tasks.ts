import { Component, inject, input, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { map, Observable } from 'rxjs';
import { TaskT } from '../../../../shared/types';
import { AsyncPipe } from '@angular/common';
import { Task } from './task/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tl-tasks',
  imports: [AsyncPipe, Task, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  readonly todolistId = input.required<string>();
  tasks$!: Observable<TaskT[]>;
  private taskService = inject(TaskService);
  protected taskTitle = '';
  ngOnInit() {
    // this.tasks$ = this.taskService.getTasks(this.todolistId());
    this.tasks$ = this.taskService.tasks$.pipe(
      map((res) => {
        return res[this.todolistId()];
      }),
    );
    this.taskService.getTasks(this.todolistId());
    // console.log(this.tasks$);
  }
  addTaskHandler() {
    this.taskService.addTask({ todoId: this.todolistId(), title: this.taskTitle });
    this.taskTitle = '';
  }
}
