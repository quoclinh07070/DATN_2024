import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../services/user.service'; // Import UserService
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    ReactiveFormsModule,],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css'
})
export class AdminAddUserComponent {
  signupForm: FormGroup;

  errorMessage: string = '';
  signupErrorMessage: string = '';
  successMessage: string = '';
  isSuccess: boolean = true;

  isPopupVisible = false; // Trạng thái hiển thị thông báo
  popupMessage = ''; // Nội dung thông báo
  alertClass = ''; // Class Bootstrap cho kiểu thông báo
  icon = ''; // Biểu tượng SVG tương ứng



  constructor(
    private authService: AuthService,
    private userService: UserService, // Inject UserService
    private router: Router,
    private fb: FormBuilder
  ) {
    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        status: ['active', Validators.required], // Giá trị mặc định
        role: ['user', Validators.required], // Giá trị mặc định
      },
      { validators: this.passwordMatchValidator } // Custom validator
    );
  }


  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  showPopup(message: string, isSuccess: boolean) {
    this.popupMessage = message;
    this.isSuccess = isSuccess;
    this.isPopupVisible = true;
    setTimeout(() => this.closePopup(), 3000);  // Hiển thị popup trong 3 giây
  }  

  closePopup() {
    this.isPopupVisible = false;
  }
  

  handleSignup() {
    if (this.signupForm.valid) {
      const { name, email, password, status, role } = this.signupForm.value;
      this.authService.Usignup(name, email, password, status, role).subscribe(
        (response) => {
          if (response.metadata?.tokens?.accessToken) {
            Swal.fire({
              title: 'Thành công!',
              text: 'Thông tin người dùng đã được cập nhật!',
              icon: 'success',
              timer: 2000,  // Đóng tự động sau 2 giây
              showConfirmButton: false
            });
            setTimeout(() => this.router.navigate(['/admin/user']), 2000);
          } else {
            this.signupErrorMessage = 'Tài khoản đã tồn tại. Vui lòng thử lại.';
            this.showPopup(this.signupErrorMessage, false);
          }
        },
        (error) => {
          console.error('Lỗi đăng ký:', error);
          this.showPopup('Tài khoản đã tồn tại. Vui lòng thử lại', false);
        }
      );
    }
  }
  
  
}
