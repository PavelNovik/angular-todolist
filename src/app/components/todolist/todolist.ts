import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainTodo } from '../../shared/types';
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
  todolist$!: Observable<DomainTodo[]>;
  private todolistService = inject(TodolistService);
  protected todoTitle = '';
  protected addTodolisthandler() {
    if (!this.todoTitle) {
      return;
    }
    this.todolistService.addTodolist(this.todoTitle);
    this.todoTitle = '';
  }

  ngOnInit() {
    this.todolist$ = this.todolistService.todolists$;
    this.todolistService.getTodolists();
  }

  protected removeTodo(todoId: string) {
    this.todolistService.removeTodo(todoId);
  }

  protected editTodoTitle(data: { id: string; newTitle: string }): void {
    this.todolistService.updateTodoTitle(data);
  }
}
