import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { CategoryService } from '../../services/category.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
  categories: any[] = [];  // Khai báo mảng để lưu trữ danh mục

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm khi component được khởi tạo
    this.getAllCategories();  // Gọi hàm khi component được khởi tạo
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;  // Gán dữ liệu vào mảng products
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }
  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;  // Gán dữ liệu vào mảng categories
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
      }
    );
  }
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName); // Gọi phương thức từ service
  }

}
