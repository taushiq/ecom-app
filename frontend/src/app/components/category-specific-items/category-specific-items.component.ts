import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-specific-items',
  templateUrl: './category-specific-items.component.html',
  styleUrls: ['./category-specific-items.component.css']
})
export class CategorySpecificItemsComponent implements OnInit {

  id: any;
  products: [];

  constructor(private service: ProductService, private route: ActivatedRoute, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; 
        this.service.getAllProductsByCategory(this.id).subscribe( data => {
          this.products = data.data;
      });  // + sign to cast the string to a number
      });
    
  }

  selectProduct(id: number){
    this.router.navigate(['/product', id]);
  }

}
