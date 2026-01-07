import { Component, inject } from '@angular/core';
import { User } from './service/user';
import { Observable } from 'rxjs';
import { UserT } from '../../shared/types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tl-users',
  imports: [AsyncPipe],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users {
  users$!: Observable<UserT[]>;
  private userService = inject(User);

  getUsers(page: number) {
    this.users$ = this.userService.getUsers(page);
  }

  ngOnInit() {
    this.getUsers(1);
  }
}
