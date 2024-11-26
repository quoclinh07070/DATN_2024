import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product-category',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
=======
@Component({
  selector: 'app-admin-product-category',
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.css']
})
<<<<<<< HEAD
export class AdminProductCategoryComponent {
  categories: any[] = [];
  filteredCategories: any[] = [];
  parentCategories: any[] = []; // Danh sách danh mục cha

  searchTerm: string = '';
  selectedParentCategory: string = '';
  selectedStatus: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;
        this.filteredCategories = this.categories;
        // Lọc ra danh mục cha
        this.parentCategories = this.categories.filter(category => !category.parent_categoryID);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
      }
    );
  }
=======
export class AdminProductCategoryComponent  {

>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category => {
      const matchesSearchTerm = category.category_name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesParentCategory = this.selectedParentCategory
        ? category.parent_categoryID == this.selectedParentCategory
        : true;
      const matchesStatus = this.selectedStatus
        ? category.status === this.selectedStatus
        : true;

      return matchesSearchTerm && matchesParentCategory && matchesStatus;
    });
  }

  getImageUrl(imageName: string): string {
    return this.categoryService.getImageUrl(imageName);
  }

  deleteCategory(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories.filter(category => category.id !== id);
          this.filterCategories(); // Cập nhật danh sách danh mục sau khi xóa
          alert('Danh mục đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa danh mục!');
          console.error('Lỗi khi xóa danh mục:', error);
        }
      );
    }
  }
}

