import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostCategoryService } from '../../../services/postcategory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-post',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-add-post.component.html',
  styleUrl: './admin-add-post.component.css'
})
export class AdminAddPostComponent {
  postcategory: any = {
    name: '',
    parentCategoryID: null,
    image_url: null
  };

  fileError: boolean = false;

  constructor(private postCategoryService: PostCategoryService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileError = false; // Reset lỗi

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.postcategory.image_url = file;
      } else {
        this.fileError = true; // Đặt lỗi nếu tệp không hợp lệ
      }
    }
  }

  createPostCategory(): void {
    if (this.fileError) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.postcategory.name);
    formData.append('parentCategoryID', this.postcategory.parentCategoryID?.toString() || '');
    formData.append('image_url', this.postcategory.image_url);

    this.postCategoryService.createPostCategory(formData).subscribe(
      (response) => {
        alert('Danh mục đã được thêm!');
        this.router.navigate(['/admin/post-category']);
      },
      (error) => {
        alert('Lỗi khi thêm danh mục! Vui lòng kiểm tra lại thông tin.');
      }
    );
  }
}
