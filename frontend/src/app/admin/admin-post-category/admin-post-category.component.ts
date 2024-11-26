<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostCategoryService } from '../../services/postcategory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
=======
import { Component } from '@angular/core';
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

@Component({
  selector: 'app-admin-post-category',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, CommonModule, FormsModule],
=======
  imports: [],
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  templateUrl: './admin-post-category.component.html',
  styleUrls: ['./admin-post-category.component.css']
})
<<<<<<< HEAD
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
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      this.postCategoryService.deletePostCategory(id).subscribe(
        () => {
          // Update the list of categories after deletion
          this.postcategories = this.postcategories.filter(category => category.id !== id);
          this.filterCategories();  // Re-filter categories after deletion
          alert('Xóa danh mục thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa danh mục!');
          console.error('Error deleting category:', error);
        }
      );
    }
  }
}
=======
export class AdminPostCategoryComponent {

}
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
