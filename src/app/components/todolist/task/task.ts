import { Component, inject, input, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Observable } from 'rxjs';
import { TaskT } from '../../../shared/types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tl-task',
  imports: [AsyncPipe],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  tasks$!: Observable<TaskT[]>;
  private taskService = inject(TaskService);
  readonly todolistId = input<string>();
  ngOnInit() {
    this.taskService.getTasks(this.todolistId());
    this.tasks$ = this.taskService.tasks$;
    console.log(this.tasks$);
  }
}
