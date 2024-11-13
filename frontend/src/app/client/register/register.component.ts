import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [    CommonModule, RouterLink,
    ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;

  errorMessage: string = '';

  signupErrorMessage: string = '';
  successMessage: string = '';

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Thêm trường name
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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

  handleSignup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.authService.signup(name, email, password).subscribe(
        (response) => {
          if (response.metadata?.tokens?.accessToken) {
            // Lưu thông tin token và user vào localStorage
            localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
            localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
            localStorage.setItem('userId', response.metadata.user.user_id);
            localStorage.setItem('userName', response.metadata.user.name);
            localStorage.setItem('userEmail', response.metadata.user.email);

            this.showPopup('Đăng ký thành công', true);
            // Delay điều hướng sang trang login sau khi popup hiển thị đủ lâu
            setTimeout(() => {this.router.navigate(['/user']);}, 2000);
          } else {
            this.signupErrorMessage = 'Đăng ký không thành công. Vui lòng thử lại.';
          }
        },
        (error) => {
          console.error('Lỗi đăng ký:', error);
          this.showPopup('Đăng ký không thành công. Vui lòng thử lại.', false);
        }
      );
    }
  }
}
