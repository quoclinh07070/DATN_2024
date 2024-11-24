import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
<<<<<<< HEAD
import { UserService } from '../../services/user.service'; // Import UserService
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
=======
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
})
export class RegisterComponent {
  signupForm: FormGroup;

  errorMessage: string = '';
<<<<<<< HEAD
=======

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  signupErrorMessage: string = '';
  successMessage: string = '';

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

<<<<<<< HEAD
  constructor(
    private authService: AuthService,
    private userService: UserService, // Inject UserService
    private router: Router,
    private fb: FormBuilder
  ) {
    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator } // Custom validator
  );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
=======
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Thêm trường name
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  showPopup(message: string, isSuccess: boolean) {
    this.popupMessage = message;
    this.isSuccess = isSuccess;
    this.isPopupVisible = true;
<<<<<<< HEAD
    setTimeout(() => this.closePopup(), 2000);
=======
    setTimeout(() => this.closePopup(), 3000);
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
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

<<<<<<< HEAD
            // Gửi email chúc mừng
            this.userService.sendWelcomeEmail(email, name).subscribe(
              () => {
                console.log('Email chúc mừng đã được gửi thành công');
              },
              (error) => {
                console.error('Lỗi gửi email chúc mừng:', error);
              }
            );

            this.showPopup('Đăng ký thành công', true);
            // Điều hướng sau khi đăng ký thành công
            setTimeout(() => {
              this.router.navigate(['/user']);
            }, 2000);
=======
            this.showPopup('Đăng ký thành công', true);
            // Delay điều hướng sang trang login sau khi popup hiển thị đủ lâu
            setTimeout(() => {this.router.navigate(['/user']);}, 3000);
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
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
