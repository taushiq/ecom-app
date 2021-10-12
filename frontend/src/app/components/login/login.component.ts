import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  invalid: boolean;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn) {
      // redirect the user to '/view-all'
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService
      .login(this.email, this.password)
      .subscribe(
        (data) => {this.authService.userId = data.userId;this.router.navigate(['/home']);this.invalid = false},
        err => this.invalid = true
      );
  }

}
