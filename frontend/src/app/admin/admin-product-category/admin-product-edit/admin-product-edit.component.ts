import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent {
  categoryForm: FormGroup;
  selectedFile: File | null = null;
  imageError: string = '';

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryID: [''], // ID ẩn
      categoryName: ['', Validators.required], // Tên danh mục là bắt buộc
      status: ['active', Validators.required], // Trạng thái mặc định là 'active'
      image: [null] // Trường để thêm file hình ảnh
    });
  }

  // Hàm xử lý khi người dùng chọn file ảnh
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2000000) { // Kiểm tra kích thước file, giới hạn 2MB
        this.imageError = 'Kích thước hình ảnh vượt quá 2MB.';
        this.selectedFile = null;
      } else {
        this.imageError = '';
        this.selectedFile = file;
        this.categoryForm.patchValue({
          image: file
        });
      }
    }
  }

  // Hàm xử lý khi submit form
  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('categoryID', this.categoryForm.get('categoryID')?.value);
      formData.append('categoryName', this.categoryForm.get('categoryName')?.value);
      formData.append('status', this.categoryForm.get('status')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Thực hiện hành động gửi dữ liệu (gọi API)
      console.log('Dữ liệu form:', formData);
    } else {
      console.log('Form không hợp lệ:', this.categoryForm.errors);
    }
  }
}
