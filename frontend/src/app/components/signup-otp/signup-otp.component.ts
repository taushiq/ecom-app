import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css']
})
export class SignupOtpComponent implements OnInit {

  isLoading = false;
  otpvalue: number;
  signup: any = {};
  emailInvalid = false;
  otpInvalid = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signup = this.authService.signup;
  }

  formSubmit(){

    this.signup.otpvalue = this.otpvalue;
    this.isLoading = true;

    this.authService.signupFinal(this.signup)
      .subscribe(data=>{
        if(data != null){
          if(data.message === "otp_mismatch"){
            this.otpInvalid = true;
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              confirmButtonColor: '#D10024',
              confirmButtonText: 'GOT IT',
              text: 'OTP entered is incorrect',
            }).then(data => {
              
            })
          }else if(data.message === "value_missing" || data.message === "Something went wrong"){
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              confirmButtonColor: '#D10024',
              confirmButtonText: 'GOT IT',
              text: 'Please try again!',
            }).then(data => {
              if(data){
                this.router.navigate(['/signup']);
              }
            })
          }else if(data.message === "success"){
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Otp Sent',
              confirmButtonColor: '#D10024',
              confirmButtonText: 'GOT IT',
              text: 'Successfully registered!',
            }).then(data => {
              if(data){
                this.authService.signup = {};
                this.authService.passwordHashed = false;
                this.router.navigate(['/login']);
              }
            })
          }
        }
      });




  }

  resendOtp(){
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
                this.router.navigate(['/signup']);
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
                this.router.navigate(['/signup']);
              }
            })
          }else if(data.message === "email_sent"){
            this.otpvalue = null;
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Otp Sent',
              confirmButtonColor: '#D10024',
              confirmButtonText: 'GOT IT',
              text: 'Otp sent to your Email',
            }).then(data => {
              if(data){
                
              }
            })
          }
        }
      });
  }

}
