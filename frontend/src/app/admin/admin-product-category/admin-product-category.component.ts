import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-product-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-product-category.component.html',
  styleUrl: './admin-product-category.component.css'
})
export class AdminProductCategoryComponent {
  categories: any[] = [];  // Khai báo mảng để lưu trữ danh mục

constructor(private categoryService: CategoryService) {}

ngOnInit(): void {
  this.getAllCategories();  // Gọi hàm khi component được khởi tạo
}

getAllCategories(): void {
  this.categoryService.getAllCategories().subscribe(
    (response: any) => {
      this.categories = response.categories;  // Gán dữ liệu vào mảng categories
    },
    (error) => {
      console.error('Lỗi khi lấy dữ liệu danh mục:', error);
    }
  );
}

getImageUrl(imageName: string): string {
  return this.categoryService.getImageUrl(imageName); // Gọi phương thức từ service
}

deleteCategory(id: number): void {
  if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        // Cập nhật danh sách danh mục sau khi xóa
        this.categories = this.categories.filter(category => category.id !== id);
        alert('Danh mục đã được xóa thành công!');
        console.log('Danh mục đã được xóa thành công!');
      },
      (error) => {
        alert('Lỗi khi xóa danh mục!');
        console.error('Lỗi khi xóa danh mục:', error);
      }
    );
  }
}

}
