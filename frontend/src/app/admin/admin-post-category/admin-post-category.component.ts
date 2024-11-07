import { Component } from '@angular/core';
// import { PostCategoriesService } from '../../services/postcategories';
import { RouterLink } from '@angular/router';
import { PostCategoryService } from '../../services/postcategory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-post-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-post-category.component.html',
  styleUrl: './admin-post-category.component.css'
})
export class AdminPostCategoryComponent {
  postcategories: any[] = [];  // Array to store categories

  constructor(private postCategoryService: PostCategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();  // Call function on component initialization
  }

  getAllCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.postcategories = response.postcategories;  // Gán dữ liệu vào mảng postcategories
      },
      (error) => {
        console.error('Lỗi khi lấy danh mục:', error);
      }
    );
  }
  
  getImageUrl(imageName: string): string {
    return this.postCategoryService.getImageUrl(imageName); // Gọi phương thức từ service
  }
  
  deleteCategory(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      this.postCategoryService.deletePostCategory(id).subscribe(
        () => {
          // Cập nhật danh sách danh mục sau khi xóa
          this.postcategories = this.postcategories.filter(category => category.id !== id);
          alert('Xóa danh mục thành công!');
          console.log('Xóa danh mục thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa danh mục!');
          console.error('Lỗi khi xóa danh mục:', error);
        }
      );
    }
  }
  
}
