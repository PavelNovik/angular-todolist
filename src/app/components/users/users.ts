import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs';
import { UserT } from '../../shared/types';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'tl-users',
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users implements OnInit {
  users$!: Observable<UserT[]>;
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  getUsers(page: number) {
    this.users$ = this.userService.getUsers(page);
  }

  protected nextUserHandler() {
    const page = Number(this.route.snapshot.queryParamMap.get('page'));
    const nextPage = page ? page + 1 : 2;
    this.router.navigate(['users'], { queryParams: { page: nextPage } });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.getUsers(params['page']);
    });
  }
}
