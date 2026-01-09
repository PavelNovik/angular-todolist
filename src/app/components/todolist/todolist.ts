import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodolistT } from '../../shared/types';
import { TodolistService } from './service/todolist.service';
import { AsyncPipe } from '@angular/common';
import { Todo } from './todo/todo';

@Component({
  selector: 'tl-todolist',
  imports: [AsyncPipe, Todo],
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.scss'],
})
export class Todolist implements OnInit {
  todolist$!: Observable<TodolistT[]>;
  private todolistService = inject(TodolistService);

  ngOnInit() {
    this.todolist$ = this.todolistService.todolists$;
    this.todolistService.getTodolists();
  }
}
