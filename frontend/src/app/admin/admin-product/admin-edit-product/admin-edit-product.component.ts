import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})

export class AdminEditProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Khởi tạo form với các điều kiện xác thực
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [null],
      description: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      status: ['active', Validators.required],
      categories_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.getProduct(this.productId);
    }
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.productForm.patchValue(response.product);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        alert('Không thể tải dữ liệu sản phẩm.');
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  updateProduct(): void {
    if (this.productForm.invalid) {
      alert('Vui lòng kiểm tra lại thông tin sản phẩm!');
      return;
    }

    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      if (key === 'image' && this.productForm.get('image')?.value) {
        formData.append(key, this.productForm.get('image')?.value);
      } else {
        formData.append(key, this.productForm.get(key)?.value);
      }
    });

    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe(
        (response) => {
          alert('Sản phẩm đã được cập nhật!');
          this.router.navigate(['/admin/product']);
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
          if (error.status === 400) {
            alert('Lỗi: Dữ liệu không hợp lệ!');
          } else {
            alert('Có lỗi xảy ra, vui lòng thử lại.');
          }
        }
      );
    }
  }
}