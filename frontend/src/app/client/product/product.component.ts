import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  categories: any[] = [];  // Mảng danh mục sản phẩm

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }

  ngOnInit(): void {
    this._getProducts();
  }

  // Lấy danh mục từ dữ liệu sản phẩm trả về
  _getCategories(products: any[]): void {
    // Lọc các danh mục không trùng lặp từ dữ liệu sản phẩm
    const categoriesSet = new Set();
    products.forEach(product => {
      if (product.category_id) {
        categoriesSet.add({ id: product.category_id, name: product.category_name });
        // categoriesSet.add({ id: product.id, name: product.category });
      }
    });

    this.categories = Array.from(categoriesSet);
  }

  // Lọc sản phẩm theo các tham số
_getProducts(): void {
  this.loading = true;
  const { minPrice, maxPrice, categoryId } = this.priceForm.value;  // Lấy giá trị từ form

  this.productService.getAllProducts(minPrice, maxPrice, categoryId).subscribe(
    (response: any) => {
      this.products = response.products || []; 
      // this.products = response || []; 
      this._getCategories(this.products); 
      this.loading = false;
    },
    (error) => {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      this.errorMessage = 'Có lỗi xảy ra khi lấy dữ liệu sản phẩm.';
      this.loading = false;
    }
  );
}


  // Hàm để tải lại danh sách sản phẩm khi có thay đổi giá hoặc danh mục
  loadProducts(): void {
    this._getProducts();
  }

  // Xử lý khi người dùng chọn danh mục
  onCategorySelect(categoryId: number): void {
    // Cập nhật giá trị categoryId trong form mà không thay đổi các giá trị khác
    this.priceForm.patchValue({ categoryId });
    this.loadProducts();  // Gọi lại hàm lọc sản phẩm khi chọn danh mục
  }
}
