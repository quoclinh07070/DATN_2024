import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-product-category',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-product-category.component.html',
  styleUrl: './admin-product-category.component.css'
})
export class AdminProductCategoryComponent {
  categories: any[] = [];
  filteredCategories: any[] = [];
  parentCategories: any[] = []; // Danh sách danh mục cha

  searchTerm: string = '';
  selectedParentCategory: string = '';
  selectedStatus: string = '';

   // Thuộc tính phân trang
   currentPage: number = 1; // Trang hiện tại
   itemsPerPage: number = 4; // Số mục hiển thị trên mỗi trang

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
  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCategories.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredCategories.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getImageUrl(imageName: string): string {
    return this.categoryService.getImageUrl(imageName);
  }


deleteCategory(id: number): void {
  Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Bạn có muốn xóa danh mục này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có, xóa ngay!',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories.filter(category => category.id !== id);
          this.filterCategories(); // Cập nhật danh sách sau khi xóa
          Swal.fire({
            title: 'Thành công!',
            text: 'Danh mục đã được xóa thành công!',
            icon: 'success',
            timer: 2000, // Đóng tự động sau 2 giây
            showConfirmButton: false
          });
        },
        (error) => {
          Swal.fire({
            title: 'Lỗi!',
            text: 'Lỗi khi xóa danh mục!',
            icon: 'error'
          });
          console.error('Lỗi khi xóa danh mục:', error);
        }
      );
    }
  });
}

}
