import { Component } from '@angular/core';
// import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-admin-product-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-product-edit.component.html',
  styleUrl: './admin-product-edit.component.css'
})
export class AdminProductEditComponent {
  category: any = {
    category_name: '',
    description: '',
    images: null,
    parent_categoryID: '',
    status: 'inactive',
    created_at: '',
    updated_at: ''
  };
  categoryId: number | null = null;
  
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.getCategory(this.categoryId);
    }
  }
  
  getCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe(
      (response: any) => {
        this.category = response.category;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
      }
    );
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.category.images = file;
    }
  }
  
  updateCategory(): void {
    const formData = new FormData();
    formData.append('category_name', this.category.category_name);
    formData.append('description', this.category.description);
    if (this.category.images) {
      formData.append('images', this.category.images);
    }
    formData.append('parent_categoryID', this.category.parent_categoryID);
    formData.append('status', this.category.status);
    formData.append('created_at', this.category.created_at);
    formData.append('updated_at', this.category.updated_at);
  
    if (this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, formData).subscribe(
        (response) => {
          alert('Danh mục đã được cập nhật!');
          this.router.navigate(['/admin/productCategory']);
        },
        (error) => {
          alert('Lỗi khi cập nhật danh mục!');
        }
      );
    }
  }
  
}
