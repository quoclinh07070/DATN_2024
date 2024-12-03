import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // Người dùng chưa đăng nhập
      this.showAlert('Bạn chưa đăng nhập!', 'Vui lòng đăng nhập để tiếp tục.', 'warning');
      this.router.navigate(['/login']);
      return false;
    }
    // Nếu đã đăng nhập, cho phép truy cập
    return true;
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Đóng',
    });
  }
}
