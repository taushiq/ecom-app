import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModelServer } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartModelServer } from 'src/app/models/cart.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductModelServer;
  productId: number;
  productInCart:boolean = false;
  numInCart: number;
  cartSubscription: Subscription;
  customerComponentCart = [];
  productImages;

  constructor(config: NgbCarouselConfig, private service: ProductService, private activatedRoute: ActivatedRoute,
    private router: Router, private cartService: CartService) {
      config.interval = 2000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = false;
     }

  ngOnInit(): void {
    this.customerComponentCart = this.cartService.getCustomerCart();
    this.activatedRoute.params.subscribe(p=>{
      this.productId = p["id"];
      this.getProduct(p["id"]);
      
      
    });
    
    this.cartSubscription = this.cartService.cartSubscription
    .subscribe(
      (cart: CartModelServer[]) => {
        
        this.customerComponentCart = cart;
        if(this.customerComponentCart.length > 0){
          for(var i = 0; i < this.customerComponentCart.length; i++){
            if(this.customerComponentCart[i].productId == this.productId){
              this.productInCart = true;
              this.numInCart = this.customerComponentCart[i].numInCart;
              
            }else{
              this.productInCart = false;
            }
          }
          
        }else{
          this.productInCart = false;
          
        }
      }
    );
    
    

  }


  getProduct(productId: number){
    this.service.getSingleProduct(productId)
      .subscribe(data => {
        
        if(data.statusCode === "200"){
          this.product = data.data[0];
          
          this.productImages = this.product.images ? this.product.images.split(";") : [this.product.image];
          
        }else{
          //Error Logging is required
        }

        if(this.customerComponentCart.length > 0){
          for(var i = 0; i < this.customerComponentCart.length; i++){
            if(this.customerComponentCart[i].productId == this.productId){
            this.productInCart = true;
            this.numInCart = this.customerComponentCart[i].numInCart;
            }
          }
      }else{
        this.productInCart = false;
      }
      }
      
      , err => {
        //Error Logging is required
      });
  }

  randomPriceGenerator(price: number){
    return (price + 10);
  }

  updateCart(product: ProductModelServer, operation){
    //console.log('Update Product Cart from Home Component ', product, operation);
    this.cartService.updateCart(product.id, product, operation);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
