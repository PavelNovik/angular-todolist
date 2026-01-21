import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationT } from './types';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  notification$ = new BehaviorSubject<NotificationT | null>(null);
  handleError(message: string) {
    this.notification$.next({ message, severity: 'error' });
  }
  handleWarning(message: string) {
    this.notification$.next({ message, severity: 'warning' });
  }
  handleInfo(message: string) {
    this.notification$.next({ message, severity: 'info' });
  }
  handleSuccess(message: string) {
    this.notification$.next({ message, severity: 'success' });
  }
  clear() {
    this.notification$.next(null);
  }
}
