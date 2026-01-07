import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs';
import { UserT } from '../../shared/types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tl-users',
  imports: [AsyncPipe],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users implements OnInit {
  users$!: Observable<UserT[]>;
  private userService = inject(UserService);

  getUsers(page: number) {
    this.users$ = this.userService.getUsers(page);
  }

  ngOnInit() {
    this.getUsers(1);
  }
}
