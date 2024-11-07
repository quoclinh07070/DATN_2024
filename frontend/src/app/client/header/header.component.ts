import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Sửa styleUrl thành styleUrls
})
export class HeaderComponent {
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Kiểm tra nếu đang trong môi trường trình duyệt trước khi sử dụng localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('userName');
    }
  }
}
