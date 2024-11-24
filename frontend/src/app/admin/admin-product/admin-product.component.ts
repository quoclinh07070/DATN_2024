import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

@Component({
  selector: 'app-admin-product',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
=======
  imports: [RouterLink, CommonModule],
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  providers: [ProductService],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
<<<<<<< HEAD
  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }
=======

  constructor(private productService: ProductService) {}
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm khi component được khởi tạo
  }

  getAllProducts(): void {
<<<<<<< HEAD
    this.loading = true;
    const { minPrice, maxPrice, categoryId} = this.priceForm.value;

=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;  // Gán dữ liệu vào mảng products
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }
  
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName); // Gọi phương thức từ service
  }

  deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          // Cập nhật danh sách sản phẩm sau khi xóa
          this.products = this.products.filter(product => product.id !== id);
          alert('Sản phẩm đã được xóa thành công!');
          console.log('Sản phẩm đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa sản phẩm!');
          console.error('Lỗi khi xóa sản phẩm:', error);
        }
      );
    }
  }
  
}
