import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service'; // Import service
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent {
  post: any = {
    title: '',
    content: '',
    image_url: null,
    post_category_id: '',
    status: 'draft',
    created_at: '',
    updated_at: ''
  };

  fileError: boolean = false;

  constructor(private postService: PostService, private router: Router) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileError = false; // Reset lỗi

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.post.image_url = file;
      } else {
        this.fileError = true; // Đặt lỗi nếu tệp không hợp lệ
      }
    }
  }

  addPost(): void {
    if (this.fileError) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    formData.append('image_url', this.post.image_url);
    formData.append('post_category_id', this.post.post_category_id);
    formData.append('status', this.post.status);
    formData.append('created_at', new Date().toISOString()); // Cập nhật thời gian tạo
    formData.append('updated_at', new Date().toISOString()); // Cập nhật thời gian cập nhật

    this.postService.createPost(formData).subscribe(
      (response) => {
        alert('Bài viết đã được thêm!');
        this.router.navigate(['/admin/post']);
      },
      (error) => {
        alert('Lỗi khi thêm bài viết! Vui lòng kiểm tra lại thông tin.');
      }
    );
  }
}
