import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, AdminHeaderComponent,AdminFooterComponent ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {}