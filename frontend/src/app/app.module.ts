import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module'; // Đường dẫn tương ứng
import { ClientModule } from './client/client.module'; // Đường dẫn tương ứng

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule, // Thêm vào đây
    ClientModule, // Thêm vào đây
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
