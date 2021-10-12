import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  getAllProducts(numberOfResults: number = 10): Observable<any>{
    const options = {
      headers: {
        'authorization': 'Bearer ' + this.authService.token
      },
      params: {
        limit: numberOfResults.toString()
      }
    };
    return this.http.get(this.SERVER_URL, options);
  }

  getAllProductsByCategory(id:number):Observable<any>{
    const options = {
      headers: {
        'authorization': 'Bearer ' + this.authService.token
      }
    };
    return this.http.get(this.SERVER_URL + '/category/' + id, options);
  }

  getSingleProduct(productId:number): Observable<any>{
    const options = {
      headers: {
        'authorization': 'Bearer ' + this.authService.token
      }
    };
    return this.http.get(this.SERVER_URL + '/' + productId, options);
  }
}
