import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component'; // Import component
import { FooterComponent } from './footer/footer.component'; // Import component
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

import { FormsModule } from '@angular/forms'; // Đảm bảo FormsModule được import
import { LoginComponent } from './login/login.component'; // Import LoginComponent
import { HomeComponent } from './home/home.component'; // Import LoginComponent
@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent, // Import component ở đây
    FooterComponent,
    LoginComponent,
    HomeComponent, // Import component ở đây
  ],
  declarations: [
  ],
  providers: [ AuthService,
    provideHttpClient(withInterceptorsFromDi())  // Cấu hình HttpClient theo cách mới
  ]
})
export class ClientModule { }
