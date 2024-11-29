import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http'; // Sử dụng HttpClient cho các yêu cầu HTTP
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

=======
import { HttpClient } from '@angular/common/http';  // Thêm HttpClient để gửi request
import Swal from 'sweetalert2';
>>>>>>> d58cdb7109333951d275d7d475f1a6a37f05a0f0
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
  
<<<<<<< HEAD
  showModal(): void {
    // Kiểm tra nếu có userToDelete, tức là có người dùng cần xóa
    if (this.userToDelete) {
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        modalElement.style.display = 'block'; // Hiển thị modal
      }
    }
  }
  

  closeModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      modalElement.style.display = 'none'; // Ẩn modal
    }
    this.resetModal();  // Reset lại thông tin modal sau khi đóng
  } 

  resetModal(): void {
    this.userToDelete = null;  // Đảm bảo không có user nào được chọn để xóa
  }
  

  deleteUser(): void {
    if (this.deleteReason.trim() === '') {
      this.deleteReasonError = 'Vui lòng nhập lý do xóa tài khoản.'; // Hiển thị lỗi
      return;
    }

    this.userService.deleteUser(this.userToDelete.userID).subscribe(
      () => {
        Swal.fire('Thành công!','Thông tin người dùng đã được cập nhật!','success');
        this.sendEmailNotification(this.userToDelete.email, this.userToDelete.fullName, this.deleteReason);
        this.getAllUsers();
        this.closeModal(); // Đóng modal sau khi xóa thành công
      },
      (error) => {
        console.error('Lỗi khi xóa người dùng:', error);
        Swal.fire('Thất bại!','Thông tin người dùng không được cập nhật!','error');
        this.deleteReasonError = 'Lỗi khi xóa người dùng. Vui lòng thử lại sau.';
      }
    );
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa';
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'user':
        return 'Người dùng';
      default:
        return 'Không xác định';
    }
  }  

  // Phương thức lấy dữ liệu phân trang
  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  // Chuyển đến trang
  goToPage(page: number): void {
    this.currentPage = page;
  }
  getTotalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
  getPaginationArray(): number[] {
    const totalPages = this.getTotalPages();
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  sendEmailNotification(email: string, fullName: string, reason: string): void {
    this.userService.sendEmail(email, fullName, reason).subscribe(
      (response) => {
=======
  sendEmailNotification(email: string, fullName: string): void {
    this.userService.sendEmail(email, fullName).subscribe(
      response => {
>>>>>>> d58cdb7109333951d275d7d475f1a6a37f05a0f0
        console.log('Email đã được gửi:', response);
      },
      error => {
        console.error('Lỗi khi gửi email:', error);
      }
    );
  }
  
  
}
