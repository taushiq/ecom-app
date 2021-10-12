import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategorySpecificItemsComponent } from './components/category-specific-items/category-specific-items.component';
import { CategorySelectComponent } from './components/category-select/category-select.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupOtpComponent } from './components/signup-otp/signup-otp.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';


  const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'product/:id',
      component: ProductComponent
    },
    {
      path: 'cart',
      component: CartComponent
    },
    {
      path: 'checkout',
      component: CheckoutComponent
    },
    {
      path: 'thankyou',
      component: ThankyouComponent
    },
    {
      path: 'contactus',
      component: ContactusComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path:'signup',
      component: SignupComponent
    },
    {
      path:'signupotp',
      component: SignupOtpComponent
    },
    {
      path:'thankyou',
      component: ThankyouComponent
    },
    {
      path:'myorders',
      component: MyOrdersComponent
    },
    {
      path:'adminlogin',
      component: AdminLoginComponent
    },
    {
      path:'adminhome', component: AdminHomeComponent, children: [
        { path: 'categories' , component: AdminCategoriesComponent},
        { path: 'products' , component: AdminProductsComponent},
        { path: 'orders' , component: AdminOrdersComponent},
      ]
    },
    {
      path: 'categories', component: CategoriesComponent, children: [
        { path: '' , component: CategorySelectComponent},
        { path: ':id' , component: CategorySpecificItemsComponent}
        ]
    },
    
    {
      // this is the default route handler; must be the last one.
      path: '**',
      component: PnfComponent
    }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
