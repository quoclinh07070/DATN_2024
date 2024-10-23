import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    // Khởi tạo form với validators
    registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  
    // Hàm xử lý submit form
    onSubmit() {
      if (this.registerForm.invalid) {
        // Mark all controls as touched to display validation errors
        this.registerForm.markAllAsTouched();
        return;
      }
      console.log('Form Submitted', this.registerForm.value);
    }
  
     // Các getter để lấy giá trị và trạng thái của các form control
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  }
