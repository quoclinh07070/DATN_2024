import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSubmit() {
    // Kiểm tra username và password (chỉ là ví dụ cơ bản)
    if (this.username === 'admin' && this.password === 'admin') {
      // Chuyển hướng tới trang khác sau khi đăng nhập thành công
      this.router.navigate(['/home']);
    } else {
      // Hiển thị lỗi nếu đăng nhập thất bại
      this.errorMessage = 'Invalid username or password!';
    }
  }
}

