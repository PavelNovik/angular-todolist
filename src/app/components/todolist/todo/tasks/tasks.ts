import { Component, inject, input, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { combineLatest, map, Observable } from 'rxjs';
import { TaskT, UpdateTaskModel } from '../../../../shared/types';
import { AsyncPipe } from '@angular/common';
import { Task } from './task/task';
import { FormsModule } from '@angular/forms';
import { TodolistService } from '../../service/todolist.service';
import { TaskStatusEnum } from '../../../../enums/taskStatus.enum';

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
  private todolistService = inject(TodolistService);
  protected taskTitle = '';
  ngOnInit() {
    // this.tasks$ = this.taskService.getTasks(this.todolistId());
    // this.tasks$ = this.taskService.tasks$.pipe(
    //   map((res) => {
    //     return res[this.todolistId()];
    //   }),
    // );

    // console.log(this.tasks$);

    this.tasks$ = combineLatest([this.taskService.tasks$, this.todolistService.todolists$]).pipe(
      map((res) => {
        const tasksForTodo = res[0][this.todolistId()];
        const activeTodo = res[1].find((t) => t.id === this.todolistId());
        return activeTodo!.filter === 'all'
          ? tasksForTodo
          : activeTodo!.filter === 'active'
            ? tasksForTodo.filter((t) => t.status === TaskStatusEnum.active)
            : tasksForTodo.filter((t) => t.status === TaskStatusEnum.completed);
      }),
    );
    this.taskService.getTasks(this.todolistId());
  }
  addTaskHandler() {
    this.taskService.addTask({ todoId: this.todolistId(), title: this.taskTitle });
    this.taskTitle = '';
  }

  protected removeTask(data: { todolistId: string; taskId: string }) {
    this.taskService.removeTask(data.todolistId, data.taskId);
  }

  protected changeTask(data: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    this.taskService.updateTask(data);
  }
}
