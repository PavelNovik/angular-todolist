import { Component, input, output } from '@angular/core';
import { TodolistT } from '../../../shared/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tl-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  readonly todolist = input<TodolistT>();
  readonly removeTodo = output<string>();
  readonly editTodo = output<{ id: string; newTitle: string }>();
  // @Output() readonly removeTodoEvent = new EventEmitter<string>();

  isEditMode = false;
  newTitle = '';

  activateEditModeHandler() {
    const title = this.todolist()?.title;
    if (title) {
      this.newTitle = title;
    }
    this.isEditMode = true;
  }

  protected removeTodolist() {
    const id = this.todolist()?.id;
    if (id) {
      this.removeTodo.emit(id);
    }
  }

  protected editTitleHandler() {
    const id = this.todolist()?.id;
    if (id) {
      this.editTodo.emit({ id, newTitle: this.newTitle });
    }

    this.isEditMode = false;
    this.newTitle = '';
  }
}
