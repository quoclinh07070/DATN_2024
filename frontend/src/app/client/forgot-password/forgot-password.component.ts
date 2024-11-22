import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true, // Định nghĩa component là standalone
  imports: [
    CommonModule, // Cần thiết cho *ngIf, *ngFor
    RouterLink,
    ReactiveFormsModule, // Cần thiết cho Reactive Forms
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Khởi tạo form
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.http
        .post('http://localhost:3000/api/forgot-password', this.forgotPasswordForm.value)
        .subscribe({
          next: (response: any) => {
            this.message = response.message; // Hiển thị thông báo thành công
            this.error = '';
          },
          error: (err) => {
            this.error = err.error.message || 'Có lỗi xảy ra!'; // Xử lý lỗi
            this.message = '';
          },
        });
    }
  }
}
