import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';  // Thêm HttpClient để gửi request
=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [UserService],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
<<<<<<< HEAD
export class AdminUserComponent implements OnInit {
  users: any[] = [];  // Khai báo mảng để lưu trữ

  constructor(private userService: UserService, private http: HttpClient) {}
=======
export class AdminUserComponent implements OnInit{
  users: any[] = [];  // Khai báo mảng để lưu trữ

  constructor(private userService: UserService) {}
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

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

<<<<<<< HEAD
  deleteUser(id: number, email: string, fullName: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Gửi email thông báo
          this.sendEmailNotification(email, fullName);
  
          // Cập nhật danh sách người dùng
          this.getAllUsers();
          alert('Người dùng đã được xóa thành công!');
=======
  deleteUser(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Gọi lại API để lấy danh sách người dùng mới sau khi xóa
          this.getAllUsers(); // Gọi lại hàm để tải lại danh sách người dùng
          alert('Người dùng đã được xóa thành công!');
          console.log('Người dùng đã được xóa thành công!');
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
        },
        (error) => {
          alert('Lỗi khi xóa người dùng!');
          console.error('Lỗi khi xóa người dùng:', error);
        }
      );
    }
  }
  
<<<<<<< HEAD
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
  
  
=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
}
