import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostCategoryService } from '../../services/postcategory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-post-category',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-post-category.component.html',
  styleUrls: ['./admin-post-category.component.css']
})
export class AdminPostCategoryComponent implements OnInit {
  postcategories: any[] = [];  // Array to store all categories
  filteredCategories: any[] = [];  // Array to store filtered categories based on search
  searchTerm: string = '';  // Variable to store the search term

  constructor(private postCategoryService: PostCategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();  // Fetch categories when the component is initialized
  }

  // Function to fetch all categories
  getAllCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.postcategories = response.postcategories;  // Store categories in postcategories
        this.filteredCategories = this.postcategories;  // Initially, show all categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Function to filter categories based on the search term
  filterCategories(): void {
    if (this.searchTerm) {
      // Filter categories by name using the search term (case-insensitive)
      this.filteredCategories = this.postcategories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If there's no search term, show all categories
      this.filteredCategories = this.postcategories;
    }
  }

  // Function to get image URL for categories
  getImageUrl(imageName: string): string {
    return this.postCategoryService.getImageUrl(imageName);  // Call method from service
  }

  // Function to delete a category
  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa danh mục này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postCategoryService.deletePostCategory(id).subscribe(
          () => {
            // Cập nhật danh sách danh mục sau khi xóa
            this.postcategories = this.postcategories.filter(category => category.id !== id);
            
            // Hiển thị thông báo thành công
            Swal.fire({
              title: 'Thành công!',
              text: 'Xóa danh mục thành công!',
              icon: 'success',
              timer: 2000, // Đóng tự động sau 2 giây
              showConfirmButton: false
            }).then(() => {
              // Làm mới trang sau khi thông báo thành công
              window.location.reload(); // Cách này sẽ làm mới toàn bộ trang
            });
          },
          (error) => {
            // Hiển thị thông báo lỗi
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa danh mục!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }
  
}