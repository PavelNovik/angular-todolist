import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tl-home',
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);
  // protected isAuth = this.authService.isAuth$.getValue();
  protected isAuth = this.authService.isAuth;
  protected logoutHandler() {
    this.authService.logout();
  }

  protected loginHandler() {
    this.router.navigate(['/login']);
  }
}
