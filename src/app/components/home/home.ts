import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tl-home',
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  private authService = inject(AuthService);
  protected logoutHandler() {
    this.authService.logout();
  }
}
