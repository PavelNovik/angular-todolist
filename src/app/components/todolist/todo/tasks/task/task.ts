import { Component, input } from '@angular/core';
import { TaskT } from '../../../../../shared/types';

@Component({
  selector: 'tl-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  readonly task = input<TaskT>();
}
