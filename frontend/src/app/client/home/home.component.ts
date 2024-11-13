import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
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
