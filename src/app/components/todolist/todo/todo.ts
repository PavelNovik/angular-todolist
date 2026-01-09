import { Component, input } from '@angular/core';
import { TodolistT } from '../../../shared/types';

@Component({
  selector: 'tl-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  readonly todolist = input<TodolistT>();
}
