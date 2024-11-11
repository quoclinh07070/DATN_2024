import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = {
    name: '',
    email: '',
    phoneNumber: ''
    // Thêm các trường khác nếu cần
  };
  selectedFile: File | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Lấy thông tin profile ban đầu
    this.getUserProfile();
  }

  // Phương thức lấy thông tin người dùng
  private getUserProfile() {
    this.authService.getUserInfo().subscribe(
      (profile) => {
        this.user = profile;
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        alert('Không thể tải thông tin người dùng.');
      }
    );
  }

  // Xử lý chọn file avatar
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Gửi yêu cầu cập nhật avatar
  submitAvatarUpdate() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile, this.selectedFile.name);

      this.authService.updateAvatar(formData).subscribe(
        () => {
          alert('Cập nhật avatar thành công!');
          // Tải lại thông tin profile sau khi cập nhật thành công
          this.getUserProfile();
        },
        (error) => {
          console.error('Lỗi khi cập nhật avatar:', error);
          alert('Cập nhật avatar thất bại!');
        }
      );
    } else {
      alert('Vui lòng chọn một tập tin để cập nhật avatar!');
    }
  }

  // Gửi yêu cầu cập nhật thông tin người dùng
  submitProfileUpdate() {
    const { name, email, phoneNumber } = this.user;
    this.authService.updateUserInfo(name, email, phoneNumber).subscribe(
      () => {
        alert('Cập nhật thông tin người dùng thành công!');
        // Tải lại thông tin profile sau khi cập nhật thành công
        this.getUserProfile();
      },
      (error) => {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        alert('Cập nhật thông tin người dùng thất bại!');
      }
    );
  }
}
