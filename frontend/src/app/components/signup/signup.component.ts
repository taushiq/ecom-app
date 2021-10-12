import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import md5 from 'md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: any = {};
  invalid: boolean;
  emailInvalid: boolean;
  isLoading = false;
  

  constructor(private authService: AuthService,
    private router: Router) {
      this.signup = this.authService.signup;
      
     }

  ngOnInit(): void {
    this.emailInvalid = false;
  }

  formSubmit(){
    if(this.authService.signupPassword == null ){
      this.authService.signupPassword = md5(this.signup.password);
      this.authService.passwordHashed = false;
    }else if(this.authService.signupPassword == this.signup.password){
      this.authService.passwordHashed = true;
    }else{
      this.authService.passwordHashed = false;
    }

    if(!this.authService.passwordHashed){
      this.signup.password = md5(this.signup.password);
      this.authService.passwordHashed = true;
      this.authService.signupPassword = this.signup.password;
    }
    this.authService.signup = this.signup;
    this.isLoading = true;
    this.authService.signupInitial(this.signup)
      .subscribe(data=>{
        if(data != null){
          if(data.message === "email_already_registered"){
            this.emailInvalid = true;
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              confirmButtonColor: '#D10024',
              confirmButtonText: 'GOT IT',
              text: 'Email already Registered',
            }).then(data => {
              if(data){
                
              }
            })
          }else if(data.message === "email_could_not_be_sent" || data.message === "Something went wrong"){
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              confirmButtonColor: '#D10024',
              confirmButtonText: 'GOT IT',
              text: 'Please try again!',
            }).then(data => {
              if(data){
                
              }
            })
          }else if(data.message === "email_sent"){
            this.isLoading = false;
            this.router.navigate(['/signupotp']);
          }
        }
      });
  }

}
