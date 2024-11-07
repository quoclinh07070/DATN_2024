import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html'
})
export class AdminProductAddComponent {
  @ViewChild('form') form!: NgForm;
  fileError = false;

  category: any = {
    category_name: '',
    description: '',
    images: null,
    parent_categoryID: '',
    status: 'inactive',
    created_at: '',
    updated_at: ''
  };

  constructor(private categoryService: CategoryService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png'];
    
    if (file && validImageTypes.includes(file.type)) {
      this.category.images = file;
      this.fileError = false;
    } else {
      this.fileError = true;
      this.category.images = null;
    }
  }

  addCategory(): void {
    if (this.form.invalid) {
      this.form.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('category_name', this.category.category_name);
    formData.append('description', this.category.description);
    if (this.category.images) {
      formData.append('images', this.category.images);
    }
    formData.append('parent_categoryID', this.category.parent_categoryID);
    formData.append('status', this.category.status);
    formData.append('created_at', new Date().toISOString());
    formData.append('updated_at', new Date().toISOString());

    this.categoryService.createCategory(formData).subscribe(
      (response) => {
        alert('Danh mục đã được thêm!');
        this.router.navigate(['/admin/productCategory']);
      },
      (error) => {
        alert('Lỗi khi thêm danh mục!');
      }
    );
  }
}
