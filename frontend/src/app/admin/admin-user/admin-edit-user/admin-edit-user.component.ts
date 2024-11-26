import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  user: any = {
<<<<<<< HEAD
    Role: 'user',
    Status: 'active',
=======
    role: 'user',
    status: 'active',
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  };
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  getUser(id: number): void {
    this.userService.getUserById(id).subscribe(
        (response: any) => {
<<<<<<< HEAD
            this.user = response.user;
=======
            this.user = {
                ...response.user, // Sao chép các thuộc tính từ response.user
                role: response.user.Role, // Gán giá trị Role vào role
                status: response.user.Status // Gán giá trị Status vào status
            };
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
        },
        (error) => {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    );
<<<<<<< HEAD
  }
=======
}

>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.image = file;
    }
  }

  updateUser(): void {
<<<<<<< HEAD
    // Tạo đối tượng dữ liệu JSON chứa các thông tin cần thiết
    const updateData = {
      role: this.user.Role,
      status: this.user.Status,
    };
  
    if (this.userId) {
      // Gọi service để gửi dữ liệu
      this.userService.updateUser(this.userId, updateData).subscribe(
        (response) => {
          alert('Thông tin người dùng đã được cập nhật!');
          this.router.navigate(['/admin/user']);  // Quay lại trang danh sách người dùng
        },
        (error) => {
          alert('Lỗi khi cập nhật thông tin người dùng!');
          console.error('Lỗi khi cập nhật người dùng:', error);
        }
      );
    }
  }
  
}
=======
    const formData = new FormData();
    formData.append('role', this.user.Role);
    formData.append('status', this.user.Status);
        
    if (this.userId) {
        this.userService.updateUser(this.userId, formData).subscribe(
            (response) => {
                alert('Thông tin người dùng đã được cập nhật!');
                this.router.navigate(['/admin/user']);
            },
            (error) => {
                alert('Lỗi khi cập nhật thông tin người dùng!');
            }
        );
    }
}


}
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
