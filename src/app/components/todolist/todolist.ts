import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodolistT } from '../../shared/types';
import { TodolistService } from './service/todolist.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tl-todolist',
  imports: [AsyncPipe],
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.scss'],
})
export class Todolist implements OnInit {
  todolist$!: Observable<TodolistT[]>;
  private todolistService = inject(TodolistService);
  getTodolists() {
    this.todolistService.getTodolists();
  }

  ngOnInit() {
    this.todolist$ = this.todolistService.todolists$;
    this.getTodolists();
  }
}
