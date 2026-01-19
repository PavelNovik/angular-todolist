import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tl-todo-footer',
  imports: [DatePipe],
  templateUrl: './todo-footer.html',
  styleUrl: './todo-footer.scss',
})
export class TodoFooter {
  readonly addedDate = input.required<string>();
}
