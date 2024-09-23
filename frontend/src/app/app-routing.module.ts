import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './client/home/home.component';
import { ProductComponent } from './client/product/product.component';
import { ProductDetailsComponent } from './client/product-details/product-details.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { CartComponent } from './client/cart/cart.component';
import { ContactUsComponent } from './client/contact-us/contact-us.component';
import { BlogComponent } from './client/blog/blog.component';
import { BlogSingleComponent } from './client/blog-single/blog-single.component';
import { LoginComponent } from './client/login/login.component';
import { PagenotfoundComponent } from './client/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'product', component: ProductComponent},
  {path:'product-details', component: ProductDetailsComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'cart', component: CartComponent},
  {path:'contact', component: ContactUsComponent},
  {path:'blog', component: BlogComponent},
  {path:'blog-detail', component: BlogSingleComponent},
  {path:'login', component: LoginComponent},
  {path:'**', component: PagenotfoundComponent},
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
