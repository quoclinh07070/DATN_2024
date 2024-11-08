import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
 //login
import { AdminLoginComponent } from './admin-login/admin-login.component';
 //register
import { AdminRegisterComponent } from './admin-register/admin-register.component';

//post category
import { AdminPostCategoryComponent } from './admin-post-category/admin-post-category.component';
import { AdminAddPostComponent } from './admin-post-category/admin-add-post/admin-add-post.component';
import { AdminEditPostComponent } from './admin-post-category/admin-edit-post/admin-edit-post.component';
//product category
import { AdminProductCategoryComponent } from './admin-product-category/admin-product-category.component';
import { AdminProductAddComponent } from './admin-product-category/admin-product-add/admin-product-add.component';
import { AdminProductEditComponent } from './admin-product-category/admin-product-edit/admin-product-edit.component';
//product
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminAddProductComponent } from './admin-product/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin-product/admin-edit-product/admin-edit-product.component';
//user
import { AdminUserComponent } from './admin-user/admin-user.component';
//order
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderEditComponent } from './admin-order/admin-order-edit/admin-order-edit.component';

//post
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminAddComponent } from './admin-post/admin-add/admin-add.component';
import { AdminEditComponent } from './admin-post/admin-edit/admin-edit.component';
//voucher
import { AdminVoucherComponent } from './admin-voucher/admin-voucher.component';
import { AdminAddVoucherComponent } from './admin-voucher/admin-add-voucher/admin-add-voucher.component';
import { AdminEditVoucherComponent } from './admin-voucher/admin-edit-voucher/admin-edit-voucher.component';


//wishlistitems
// import { AdminWishlistitemsComponent } from './admin-wishlistitems/admin-wishlistitems.component';

const adminRoutes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'postCategory', component: AdminPostCategoryComponent },
    { path: 'postCategory/add', component: AdminAddPostComponent },////////
    { path: 'postCategory/edit/:id', component: AdminEditPostComponent },/////////
    
    { path: 'post', component: AdminPostComponent },
    { path: 'post/add', component: AdminAddComponent },
    { path: 'post/edit/:id', component: AdminEditComponent },

    { path: 'productCategory', component: AdminProductCategoryComponent },
    { path: 'productCategory/add', component: AdminProductAddComponent },/////////
    { path: 'productCategory/edit/:id', component: AdminProductEditComponent },

    { path: 'product', component: AdminProductComponent },
    { path: 'product/add', component: AdminAddProductComponent },
    { path: 'product/edit/:id', component: AdminEditProductComponent },

    { path: 'user', component: AdminUserComponent },

    { path: 'login', component: AdminLoginComponent },
    { path: 'register', component: AdminRegisterComponent },

    { path: 'voucher', component: AdminVoucherComponent },
    { path: 'voucher/add', component: AdminAddVoucherComponent },
    { path: 'voucher/edit/:id', component: AdminEditVoucherComponent },

    { path: 'order', component: AdminOrderComponent },//////
    { path: 'order/edit/:id', component: AdminOrderEditComponent },////////

    // { path: 'wishlistitems', component: AdminWishlistitemsComponent },////////


    // Thêm các route admin khác ở đây
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
