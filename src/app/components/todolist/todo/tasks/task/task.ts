import { Component, input, output } from '@angular/core';
import { TaskT, UpdateTaskModel } from '../../../../../shared/types';
import { TaskStatusEnum } from '../../../../../enums/taskStatus.enum';

@Component({
  selector: 'tl-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  readonly task = input<TaskT>();
  readonly removeTaskEvent = output<{ todolistId: string; taskId: string }>();
  readonly changeTaskEvent = output<{
    todolistId: string;
    taskId: string;
    model: UpdateTaskModel;
  }>();

  protected removeTaskHandler() {
    this.removeTaskEvent.emit({ todolistId: this.task()!.todoListId, taskId: this.task()!.id });
  }

  protected readonly taskStatusEnum = TaskStatusEnum;

  protected changeTaskHandler(event: PointerEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    const model: UpdateTaskModel = {
      status: newStatus ? this.taskStatusEnum.completed : TaskStatusEnum.active,
      completed: this.task()!.completed,
      title: this.task()!.title,
      description: this.task()!.description,
      priority: this.task()!.priority,
      deadline: this.task()!.deadline,
      startDate: this.task()!.startDate,
    };
    this.changeTaskEvent.emit({
      todolistId: this.task()!.todoListId,
      taskId: this.task()!.id,
      model,
    });
  }
}
