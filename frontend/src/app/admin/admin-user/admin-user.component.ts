import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

@Component({
  selector: 'app-admin-user',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, CommonModule, FormsModule],
=======
  imports: [RouterLink, CommonModule],
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  providers: [UserService],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
<<<<<<< HEAD
export class AdminUserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  searchTerm: string = '';

  // Lọc theo vai trò và trạng thái
  selectedRole: string = '';
  selectedStatus: string = '';

  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 5; // Số lượng item trên mỗi trang
  totalPages: number = 0;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.users;
        this.filteredUsers = this.users;
        this.updatePagination();
=======
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
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    );
  }
<<<<<<< HEAD

  filterUsers(): void {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      const matchesSearchTerm = user.FullName.toLowerCase().includes(lowerCaseTerm) || 
                                user.Email.toLowerCase().includes(lowerCaseTerm) || 
                                user.PhoneNumber.includes(lowerCaseTerm);

      const matchesRole = this.selectedRole ? user.Role.toLowerCase() === this.selectedRole.toLowerCase() : true;
      const matchesStatus = this.selectedStatus ? user.Status.toLowerCase() === this.selectedStatus.toLowerCase() : true;

      return matchesSearchTerm && matchesRole && matchesStatus;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.paginateUsers();
  }

  paginateUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateUsers();
    }
  }

  getImageUrl(imageName: string): string {
    return this.userService.getImageUrl(imageName);
  }

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
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
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
}
=======
}
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
