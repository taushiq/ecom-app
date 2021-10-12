import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import md5 from 'md5';

import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: number;
  email:string;
  token: string;
  adminToken: string;
  signup: any = {};
  passwordHashed = false;
  signupPassword: string;
  

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { 
    if ('token' in window.sessionStorage) {
      this.token = window.sessionStorage.getItem('token');
    }
    if ('adminToken' in window.sessionStorage) {
      this.adminToken = window.sessionStorage.getItem('adminToken');
    }
    if('userId' in window.sessionStorage){
      this.userId = +window.sessionStorage.getItem('userId');
    }
    if('email' in window.sessionStorage){
      this.email = window.sessionStorage.getItem('email');
    }
  }

  get isUserLoggedIn() {
    return this.token !== undefined;
  }

  get isAdminLoggedIn() {
    return this.adminToken !== undefined;
  }

  login(email: string, password: string): Observable<any> {
    password = md5(password);
    let data = [{ email, password }]
    //let encoded = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    //let body = { encoded }
    return this.http
       .post(this.SERVER_URL + '/login', { email, password })
      //.post('http://localhost:3000/login', body)
      .do(data => this.token = data['token'])
      .do(data => this.userId = data['userId'])
      .do(data => this.email = data['email'])
      .do(data => window.sessionStorage.setItem('token', data['token']))
      .do(data => window.sessionStorage.setItem('email', data['email']))
      .do(data => window.sessionStorage.setItem('userId', data['userId']));
  }

  adminLogin(email: string, password: string): Observable<any> {
    password = md5(password);
    let data = [{ email, password }]
    //let encoded = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    //let body = { encoded }
    return this.http
       .post(this.SERVER_URL + '/adminlogin', { email, password })
      //.post('http://localhost:3000/login', body)
      .do(data => this.adminToken = data['token'])
      .do(data => window.sessionStorage.setItem('adminToken', data['token']))
  }


  logout() {
    this.token = undefined;
    delete window.sessionStorage.token;
  }

  signupInitial(signup: any): Observable<any>{
    return this.http.post(this.SERVER_URL + '/signup', signup);
  }

  signupFinal(signup: any): Observable<any>{
    return this.http.post(this.SERVER_URL + '/signupfinal', signup)
  }


}
