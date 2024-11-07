import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostCategoryService } from '../../../services/postcategory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-post',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-edit-post.component.html',
  styleUrl: './admin-edit-post.component.css'
})
export class AdminEditPostComponent {
  postcategory: any = {
    name: '',
    parentCategoryID: null,
    image_url: null,
    status: 'active',
    created_at: '',
    updated_at: ''
  };
  postCategoryId: number | null = null;

  constructor(
    private postCategoryService: PostCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postCategoryId) {
      this.getPostCategory(this.postCategoryId);
    }
  }

  getPostCategory(id: number): void {
    this.postCategoryService.getPostCategoryById(id).subscribe(
      (response: any) => {
        this.postcategory = response.postcategory;
        // console.log(this.postcategory);
        // Đảm bảo hiển thị URL hình ảnh (nếu có) từ server trong trường hợp edit
        // if (this.postcategory.image_url) {
        //   this.postcategory.image_url = response.postCategory.image_url;
        // }
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục bài viết:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postcategory.image_url = file; // Gán tệp hình ảnh để upload
    }
  }

  updatePostCategory(): void {
    const formData = new FormData();
    formData.append('name', this.postcategory.name);
    formData.append('parentCategoryID', this.postcategory.parentCategoryID || '');
    if (this.postcategory.image_url instanceof File) {
      formData.append('image_url', this.postcategory.image_url);
    }
    formData.append('status', this.postcategory.status);
    formData.append('created_at', this.postcategory.created_at);
    formData.append('updated_at', this.postcategory.updated_at);

    if (this.postCategoryId) {
      this.postCategoryService.updatePostCategory(this.postCategoryId, formData).subscribe(
        (response) => {
          alert('Danh mục bài viết đã được cập nhật!');
          this.router.navigate(['/admin/postCategory']);
        },
        (error) => {
          alert('Lỗi khi cập nhật danh mục bài viết!');
        }
      );
    }
  }
}
