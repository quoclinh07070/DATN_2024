import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule], // Thêm FormsModule vào imports
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] // Đúng là styleUrls, không phải styleUrl
})
export class UserComponent {
  userName: string | null;
  userEmail: string | null;
  userAddress: string | null;
  userPhone: string | null;
  userBirthDate: string | null; // Thêm thuộc tính ngày sinh
  userGender: string | null; // Thêm thuộc tính giới tính
  isLoggedIn: boolean = false;

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
      this.userAddress = localStorage.getItem('userAddress');
      this.userPhone = localStorage.getItem('userPhone');
      this.userBirthDate = localStorage.getItem('userBirthDate'); // Lấy ngày sinh từ localStorage
      this.userGender = localStorage.getItem('userGender'); // Lấy giới tính từ localStorage
    } else {
      this.userName = null;
      this.userEmail = null;
      this.userAddress = null;
      this.userPhone = null;
      this.userBirthDate = null;
      this.userGender = null;
    }
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        this.showPopup('Đăng xuất thành công!', true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        console.error('Lỗi khi đăng xuất:', error);
      }
    );
  }

  onLogoutConfirm() {
    const userConfirmed = confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (userConfirmed) {
      this.onLogout();
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Phương thức cập nhật thông tin người dùng
  updateUserInfo() {
    const updatedData = {
      name: this.userName || '',
      email: this.userEmail || '',
      phoneNumber: this.userPhone || '',
      address: this.userAddress || ''
      // birthDate và gender không được gửi qua AuthService.updateUserInfo
      // Bạn có thể xử lý chúng riêng nếu cần
    };

    this.authService.updateUserInfo(updatedData).subscribe(
      (response) => {
        // Cập nhật localStorage nếu thành công
        localStorage.setItem('userName', this.userName || '');
        localStorage.setItem('userEmail', this.userEmail || '');
        localStorage.setItem('userPhone', this.userPhone || '');
        localStorage.setItem('userAddress', this.userAddress || '');
        localStorage.setItem('userBirthDate', this.userBirthDate || '');
        localStorage.setItem('userGender', this.userGender || '');

        this.showPopup('Cập nhật thông tin cá nhân thành công!', true);
      },
      (error) => {
        console.error('Lỗi khi cập nhật thông tin cá nhân:', error);
        this.showPopup('Cập nhật thông tin cá nhân thất bại!', false);
      }
    );
  }
}
