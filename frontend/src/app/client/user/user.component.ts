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
})
export class UserComponent {
  userName: string | null;
  userEmail: string | null;

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
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

  showPopup(message: string, isSuccess: boolean) {
    this.popupMessage = message;
    this.isSuccess = isSuccess;
    this.isPopupVisible = true;
    setTimeout(() => this.closePopup(), 3000);
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
