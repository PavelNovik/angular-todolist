import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tl-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,5}$'),
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false),
  });
  onSubmit(): void {
    // console.log(JSON.stringify(this.loginForm.value));
    this.authService.login(this.loginForm.value);
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
