import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [UserService],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit{
  users: any[] = [];  // Khai báo mảng để lưu trữ

  constructor(private userService: UserService) {}

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

  deleteUser(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Cập nhật danh sách sản phẩm sau khi xóa
          this.users = this.users.filter(user => user.id !== id);
          alert('Người dùng đã được xóa thành công!');
          console.log('Người dùng đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa người dùng!');
          console.error('Lỗi khi xóa người dùng:', error);
        }
      );
    }
  }
}
