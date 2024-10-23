import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Khởi tạo form với validators
  LoginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Hàm xử lý submit form
  onSubmit() {
    if (this.LoginForm.invalid) {
      // Mark all controls as touched to display validation errors
      this.LoginForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted', this.LoginForm.value);
  }

  // Các getter để lấy giá trị và trạng thái của các form control
  get username() { return this.LoginForm.get('username'); }
  get password() { return this.LoginForm.get('password'); }
}