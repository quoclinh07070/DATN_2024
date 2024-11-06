import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm khi component được khởi tạo
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
}
