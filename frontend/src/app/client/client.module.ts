import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component'; // Import component
import { FooterComponent } from './footer/footer.component'; // Import component

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    HeaderComponent, // Import component ở đây
    FooterComponent, // Import component ở đây
  ],
  declarations: [
  ]
})
export class ClientModule { }
