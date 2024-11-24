import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
<<<<<<< HEAD
=======
import { provideHttpClient, withFetch } from '@angular/common/http';
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule,
    ClientModule,
  ],
<<<<<<< HEAD
  providers: [    
=======
  providers: [   
    provideHttpClient(withFetch()) 
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  ],
  bootstrap: []
})
export class AppModule { }
