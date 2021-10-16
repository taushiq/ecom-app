import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private SERVER_URL = environment.SERVER_URL;

  deleteCategory(categoryId: string): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.get(this.SERVER_URL + '/admin/deletecategory?categoryId=' + categoryId, options);
    }

    updateCategory(categoryId: string, categoryName:string): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.get(this.SERVER_URL + '/admin/updatecategory?catId=' + categoryId + '&catName=' + categoryName, options);
    }

    addCategory(categoryName: string, categoryImage:string): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.get(this.SERVER_URL + '/admin/addcategory?catImage=' + categoryImage + '&catName=' + categoryName, options);
    }

    getAllProducts(): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.get(this.SERVER_URL + '/admin/getproducts', options);
    }

    editProduct(product:any): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.post(this.SERVER_URL + '/admin/editproduct', product, options);
    }

    deleteProduct(id:string): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.get(this.SERVER_URL + '/admin/deleteproduct?id=' + id, options);
    }

    addProduct(product:any): Observable<any>{

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.adminToken
            }
          };
      return this.http.post(this.SERVER_URL + '/admin/addproduct', product, options);
    }
    


}
