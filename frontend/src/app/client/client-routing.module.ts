import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout/client-layout.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchResultComponent } from './search-result/search-result.component';
// import { WishlistComponent } from './wishlist/wishlist.component';


const clientRoutes: Routes = [
    { path: '', component: ClientLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'about/service-detail', component: ServiceDetailComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product-detail/:id', component: ProductDetailsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart', component: CartComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog-detail', component: BlogSingleComponent },
      { path: 'login', component: LoginComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'search', component: SearchResultComponent },
      { path: '**', component: PagenotfoundComponent },
    ]},
  ];

  @NgModule({
    imports: [RouterModule.forChild(clientRoutes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule {}
