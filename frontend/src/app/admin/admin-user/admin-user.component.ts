import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Thêm HttpClient để gửi request
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [UserService],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
  users: any[] = [];  // Khai báo mảng để lưu trữ

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();  // Gọi hàm khi component được khởi tạo
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.users;  // Gán dữ liệu vào mảng 
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    );
  }
  
  getImageUrl(imageName: string): string {
    return this.userService.getImageUrl(imageName); // Gọi phương thức từ service
  }

  deleteUser(id: number, email: string, fullName: string): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          () => {
            // Gửi email thông báo
            this.sendEmailNotification(email, fullName);
  
            // Cập nhật danh sách người dùng
            this.getAllUsers();
  
            Swal.fire({
              title: 'Thành công!',
              text: 'Người dùng đã được xóa thành công!',
              icon: 'success',
              timer: 2000,  // Đóng tự động sau 2 giây
              showConfirmButton: false
            });
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa người dùng!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Lỗi khi xóa người dùng:', error);
          }
        );
      }
    });
  }
  
  sendEmailNotification(email: string, fullName: string): void {
    this.userService.sendEmail(email, fullName).subscribe(
      response => {
        console.log('Email đã được gửi:', response);
      },
      error => {
        console.error('Lỗi khi gửi email:', error);
      }
    );
  }
  
  
}
