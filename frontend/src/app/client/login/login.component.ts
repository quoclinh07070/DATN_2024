import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  errorMessage: string = '';

  signupErrorMessage: string = '';
  isSignupVisible: boolean = false;
  successMessage: string = '';

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    // Khởi tạo form đăng nhập
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Thêm trường name
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.onLogin(username, password);
    }
  }

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.metadata.tokens && response.metadata.tokens.accessToken) {
          localStorage.setItem('token', response.metadata.tokens.accessToken);
          this.showPopup('Đăng nhập thành công!', true);
          this.router.navigate(['/user']);
        } else {
          this.showPopup('Không nhận được token từ server.', false);
        }
      },
      (error) => {
        this.showPopup('Đăng nhập không thành công ! Vui lòng thử lại', false);
      }
    );
  }

  showSignupPopup() {
    this.isSignupVisible = true;
  }

  closeSignupPopup() {
    this.isSignupVisible = false;
    this.signupForm.reset();
    this.signupErrorMessage = '';
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

            this.closeSignupPopup();
            this.showPopup('Đăng ký thành công', true);
            this.router.navigate(['/login']);
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
