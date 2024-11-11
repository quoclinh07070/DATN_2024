import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  categories: any[] = [];  // Mảng danh mục sản phẩm

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService, // Inject CartService
    private fb: FormBuilder
  ) {this.priceForm = this.fb.group({
    minPrice: [null],
    maxPrice: [null],
    categoryId: [null],
  });}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.loading = true;
    const { minPrice, maxPrice, categoryId } = this.priceForm.value;  // Lấy giá trị từ form
  
    this.productService.getAllProducts(minPrice, maxPrice, categoryId).subscribe(
      (response: any) => {
        this.products = response.product || []; 
        // this.products = response || []; 
        this.getAllCategories(this.products); 
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        this.errorMessage = 'Có lỗi xảy ra khi lấy dữ liệu sản phẩm.';
        this.loading = false;
      }
    );
  }

  getAllCategories(products: any[]): void {
    const categoriesMap = new Map();
    products.forEach(product => {
      if (product.category_id && !categoriesMap.has(product.category_id)) {
        categoriesMap.set(product.category_id, { id: product.category_id, name: product.category_name });
      }
    });
  
    this.categories = Array.from(categoriesMap.values());
  }

    // Hàm để tải lại danh sách sản phẩm khi có thay đổi giá hoặc danh mục
    loadProducts(): void {
      this.getAllProducts();
    }

      // Xử lý khi người dùng chọn danh mục
  onCategorySelect(categoryId: number): void {
    // Cập nhật giá trị categoryId trong form mà không thay đổi các giá trị khác
    this.priceForm.patchValue({ categoryId });
    this.loadProducts();  // Gọi lại hàm lọc sản phẩm khi chọn danh mục
  }

  // Thêm sản phẩm vào giỏ
  addToCart(product: any) {
    this.cartService.addToCart(product); // Gọi CartService để thêm sản phẩm vào giỏ
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }

  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }
}
