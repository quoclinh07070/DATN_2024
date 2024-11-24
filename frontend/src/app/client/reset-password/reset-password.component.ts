import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true, // Standalone component
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule, // Để sử dụng Reactive Forms
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  error: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    // Khởi tạo Reactive Form
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Lấy token từ query params
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.error = 'Token không hợp lệ!';
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;

      // Kiểm tra mật khẩu khớp
      if (password !== confirmPassword) {
        this.error = 'Mật khẩu không khớp!';
        return;
      }

      // Gửi yêu cầu reset mật khẩu
      this.http
        .post('http://localhost:3000/api/reset-password', { token: this.token, newPassword: password })
        .subscribe({
          next: (response: any) => {
            this.message = response.message;
            this.error = '';
            setTimeout(() => this.router.navigate(['/login']), 2000); // Điều hướng sau 2 giây
          },
          error: (err) => {
            this.error = err.error.message || 'Có lỗi xảy ra!';
            this.message = '';
          },
        });
    }
  }
}
