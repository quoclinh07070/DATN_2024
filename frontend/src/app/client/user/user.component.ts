import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userName: string | null;
  userEmail: string | null;
  isLoggedIn: boolean = false;

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
    } else {
      this.userName = null;
      this.userEmail = null;
    }
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        this.showPopup('Đăng xuất thành công!', true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error('Lỗi khi đăng xuất:', error);
      }
    );
  }
  onLogoutConfirm() {
    // Hiển thị hộp thoại xác nhận
    const userConfirmed = confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (userConfirmed) {
      this.onLogout(); // Gọi hàm đăng xuất nếu người dùng xác nhận
    }
  }
  

  showPopup(message: string, isSuccess: boolean) {
    this.popupMessage = message;
    this.isSuccess = isSuccess;
    this.isPopupVisible = true;
    setTimeout(() => this.closePopup(), 2000);
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  // Phương thức điều hướng
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
}

