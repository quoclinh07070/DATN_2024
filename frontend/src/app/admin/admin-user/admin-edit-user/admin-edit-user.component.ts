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
    Role: 'user',
    Status: 'active',
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
            this.user = response.user;
        },
        (error) => {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    );
<<<<<<< HEAD
  }
=======
}

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

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
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
