import { Component, input, output } from '@angular/core';
import { TaskT, UpdateTaskModel } from '../../../../../shared/types';
import { TaskStatusEnum } from '../../../../../enums/taskStatus.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tl-task',
  imports: [FormsModule],
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
  taskTitle = '';
  editMode = false;

  protected removeTaskHandler() {
    this.removeTaskEvent.emit({ todolistId: this.task()!.todoListId, taskId: this.task()!.id });
  }

  protected readonly taskStatusEnum = TaskStatusEnum;

  private changeTask<K extends keyof UpdateTaskModel>(key: K, value: UpdateTaskModel[K]) {
    const model: UpdateTaskModel = {
      status: this.task()!.status,
      completed: this.task()!.completed,
      title: this.task()!.title,
      description: this.task()!.description,
      priority: this.task()!.priority,
      deadline: this.task()!.deadline,
      startDate: this.task()!.startDate,
      [key]: value,
    };
    this.changeTaskEvent.emit({
      todolistId: this.task()!.todoListId,
      taskId: this.task()!.id,
      model,
    });
  }
  private changeTask2(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task()!.status,
      completed: this.task()!.completed,
      title: this.task()!.title,
      description: this.task()!.description,
      priority: this.task()!.priority,
      deadline: this.task()!.deadline,
      startDate: this.task()!.startDate,
      ...patch,
    };
    this.changeTaskEvent.emit({
      todolistId: this.task()!.todoListId,
      taskId: this.task()!.id,
      model,
    });
  }
  protected changeTaskHandler(event: PointerEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    this.changeTask('status', newStatus ? this.taskStatusEnum.completed : TaskStatusEnum.active);
    // const model: UpdateTaskModel = {
    //   status: newStatus ? this.taskStatusEnum.completed : TaskStatusEnum.active,
    //   completed: this.task()!.completed,
    //   title: this.task()!.title,
    //   description: this.task()!.description,
    //   priority: this.task()!.priority,
    //   deadline: this.task()!.deadline,
    //   startDate: this.task()!.startDate,
    // };
  }

  protected activateEditModeHandler() {
    this.taskTitle = this.task()!.title;
    this.editMode = true;
  }

  protected editTitleHandler() {
    if (!this.taskTitle) {
      this.editMode = false;
      return;
    }

    this.changeTask2({ title: this.taskTitle });

    this.editMode = false;
    this.taskTitle = '';
  }
}
