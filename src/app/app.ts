import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Notify } from './shared/components/notify/notify';

@Component({
  selector: 'tl-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Notify],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  private authService = inject(AuthService);
  ngOnInit() {
    this.authService.me();
  }
}
