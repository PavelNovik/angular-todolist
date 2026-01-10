import { Component, input, output } from '@angular/core';
import { TodolistT } from '../../../shared/types';

@Component({
  selector: 'tl-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  readonly todolist = input<TodolistT>();
  readonly removeTodo = output<string>();
  // @Output() readonly removeTodoEvent = new EventEmitter<string>();

  protected removeTodolist() {
    const id = this.todolist()?.id;
    if (id) {
      this.removeTodo.emit(id);
    }
  }
}
