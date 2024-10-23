import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component'; // Import component
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component'; // Import component

// import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductCategoryComponent } from './admin-product-category/admin-product-category.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminNavbarComponent,
    RouterModule,
    ReactiveFormsModule,
    AdminLayoutComponent,
    AdminHeaderComponent, // Import component ở đây
    AdminFooterComponent, // Import component ở đây
    FormsModule  // FormsModule cần được import ở đây
  ],
  declarations: [
    AdminProductCategoryComponent,
    // Khai báo các component khác không phải standalone ở đây
  ],
  exports: [],
  providers: [AppComponent],
})
export class AdminModule { }
