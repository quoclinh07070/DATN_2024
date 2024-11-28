import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm khi component được khởi tạo
    
  }

  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
  filteredProducts: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm đã lọc
  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';

  // Khai báo các biến lọc
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedStatus: string = '';

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }

 // Sắp xếp theo id giảm dần (id lớn nhất đứng đầu)
  sortProducts() {
    this.filteredProducts.sort((a, b) => b.id - a.id);
  }

  getAllProducts(): void {
    this.loading = true;
    const { minPrice, maxPrice, categoryId} = this.priceForm.value;

    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;  // Gán dữ liệu vào mảng products
        this.filterProducts();  // Lọc sản phẩm sau khi nhận được dữ liệu
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  // Hàm lọc sản phẩm
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        // Kiểm tra từ khóa tìm kiếm
        (this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
        // Kiểm tra khoảng giá
        (this.selectedPriceRange ? this.filterByPriceRange(product.price) : true) &&
        // Kiểm tra trạng thái
        (this.selectedStatus ? product.status === this.selectedStatus : true)
      );
    });
  }

  // Hàm lọc theo mức giá
  filterByPriceRange(price: number): boolean {
    if (this.selectedPriceRange === 'low') return price < 1000000;
    if (this.selectedPriceRange === 'medium') return price >= 1000000 && price <= 5000000;
    if (this.selectedPriceRange === 'high') return price > 5000000;
    return true;
  }

  // Hàm lấy đường dẫn hình ảnh
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName); // Gọi phương thức từ service
  }



}