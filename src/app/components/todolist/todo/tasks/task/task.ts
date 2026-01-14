import { Component, input, output } from '@angular/core';
import { TaskT } from '../../../../../shared/types';

@Component({
  selector: 'tl-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  readonly task = input<TaskT>();
  readonly removeTaskEvent = output<{ todolistId: string; taskId: string }>();

  protected removeTaskHandler() {
    this.removeTaskEvent.emit({ todolistId: this.task()!.todoListId, taskId: this.task()!.id });
  }
}
