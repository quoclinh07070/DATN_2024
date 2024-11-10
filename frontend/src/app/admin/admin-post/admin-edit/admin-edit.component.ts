import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service'; // Giả sử có một PostService thay vì ProductService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-post',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})

export class AdminEditComponent implements OnInit {
  post: any = {
    title: '',
    content: '',
    image_url: null,
    post_category_id: '',
    status: 'draft',
    created_at: '',
    updated_at: ''
  };
  postId: number | null = null;
  isFile: boolean = false; // Biến để theo dõi nếu image_url là file hay không

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPost(this.postId);
    }
  }

  getPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      (response: any) => {
        this.post = response.post;
        // Kiểm tra nếu post.image_url là file
        this.isFile = this.post.image_url instanceof File;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.post.image_url = file;  // Gán file vào post.image_url
      this.isFile = true; // Đánh dấu đây là một file
    }
  }

  updatePost(): void {
    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    if (this.isFile) {
      formData.append('image_url', this.post.image_url);
    }
    formData.append('post_category_id', this.post.post_category_id);
    formData.append('status', this.post.status);
    formData.append('created_at', this.post.created_at);
    formData.append('updated_at', this.post.updated_at);

    if (this.postId) {
      this.postService.updatePost(this.postId, formData).subscribe(
        (response) => {
          alert('Bài viết đã được cập nhật!');
          this.router.navigate(['/admin/post']);
        },
        (error) => {
          alert('Lỗi khi cập nhật bài viết!');
        }
      );
    }
  }

  // Hàm kiểm tra dữ liệu trước khi submit
  validateForm(): boolean {
    if (!this.post.title || !this.post.content || !this.post.post_category_id) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
      return false;
    }
    return true;
  }
}

