import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout/client-layout.component';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const clientRoutes: Routes = [
    { path: '', component: ClientLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart', component: CartComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog-detail', component: BlogSingleComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: PagenotfoundComponent },
    ]},
  ];

  @NgModule({
    imports: [RouterModule.forChild(clientRoutes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule {}
