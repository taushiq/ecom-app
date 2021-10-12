import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email:string;
  password:string;
  invalid: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAdminLoggedIn) {
      this.router.navigate(['/adminhome']);
    }
  }

  login(){
    this.authService.adminLogin(this.email, this.password)
      .subscribe(
        data=>{
          if(data['token']){
            this.invalid = false;
            this.router.navigate(['/adminhome']);
          }
        },err=>{
          this.invalid = true;
        }
      );
  }

}
