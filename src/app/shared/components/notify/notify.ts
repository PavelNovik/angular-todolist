import { Component, inject, OnInit } from '@angular/core';
import { Notification } from '../../notification';
import { Observable } from 'rxjs';
import { NotificationT } from '../../types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tl-notify',
  imports: [AsyncPipe],
  templateUrl: './notify.html',
  styleUrl: './notify.scss',
})
export class Notify implements OnInit {
  notification$?: Observable<NotificationT | null>;
  private notificationService = inject(Notification);

  ngOnInit() {
    this.notification$ = this.notificationService.notification$;
  }

  protected closeNotification() {
    this.notificationService.clear();
  }
}
