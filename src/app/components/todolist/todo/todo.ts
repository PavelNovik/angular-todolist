import { Component, inject, input, output } from '@angular/core';
import { DomainTodo, FilterType } from '../../../shared/types';
import { FormsModule } from '@angular/forms';
import { Tasks } from './tasks/tasks';
import { TodoFilters } from './todo-filters/todo-filters';
import { TodoFooter } from './todo-footer/todo-footer';
import { TodolistService } from '../service/todolist.service';

@Component({
  selector: 'tl-todo',
  imports: [FormsModule, Tasks, TodoFilters, TodoFooter],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  readonly todolist = input.required<DomainTodo>();
  private todolistService = inject(TodolistService);
  readonly removeTodo = output<string>();
  readonly editTodo = output<{ id: string; newTitle: string }>();
  // @Output() readonly removeTodoEvent = new EventEmitter<string>();

  isEditMode = false;
  newTitle = '';

  activateEditModeHandler() {
    const title = this.todolist()!.title;
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
    const id = this.todolist()!.id;
    if (id) {
      this.editTodo.emit({ id, newTitle: this.newTitle });
    }

    this.isEditMode = false;
    this.newTitle = '';
  }

  protected changeFilter(filter: FilterType) {
    this.todolistService.changeFilter({ todoId: this.todolist!().id, filter });
  }
}
