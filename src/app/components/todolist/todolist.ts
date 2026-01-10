import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodolistT } from '../../shared/types';
import { TodolistService } from './service/todolist.service';
import { AsyncPipe } from '@angular/common';
import { Todo } from './todo/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tl-todolist',
  imports: [AsyncPipe, Todo, FormsModule],
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.scss'],
})
export class Todolist implements OnInit {
  todolist$!: Observable<TodolistT[]>;
  private todolistService = inject(TodolistService);
  protected todoTitle = '';
  protected addTodolisthandler() {}

  ngOnInit() {
    this.todolist$ = this.todolistService.todolists$;
    this.todolistService.getTodolists();
  }
}
