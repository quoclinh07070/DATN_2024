import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ClientRoutingModule } from './client/client-routing.module';
import { PagenotfoundComponent } from './client/pagenotfound/pagenotfound.component'; // Đảm bảo import đúng

export const routes: Routes = [
  // Route cho admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  
  // Route cho client
  { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },

  // Route cho trang không tìm thấy
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule,
    ClientRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
