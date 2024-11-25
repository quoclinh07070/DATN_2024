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
  styleUrls: ['./home.component.css'], // Sửa lỗi nhỏ: "styleUrl" => "styleUrls"
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Tất cả sản phẩm
  newestProducts: any[] = []; // Danh sách sản phẩm sắp xếp theo ngày mới nhất

  constructor(
    private productService: ProductService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    this.getNewestProducts(); // Gọi hàm lấy danh sách sản phẩm mới nhất
  }

  // Hàm gọi API để lấy danh sách tất cả sản phẩm và sắp xếp theo ngày
  getNewestProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;

        // Sắp xếp sản phẩm theo ngày mới nhất (giả sử `created_at` là ngày tạo sản phẩm)
        this.newestProducts = this.products.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // Giới hạn chỉ hiển thị 6 sản phẩm mới nhất
        this.newestProducts = this.newestProducts.slice(0, 6);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  // Hàm lấy URL hình ảnh sản phẩm
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any, quantity: number = 1): void {
    if (product.quantity > 0) {
      const success = this.cartService.addToCart(product, quantity);

      if (success) {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        alert('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    } else {
      alert('Sản phẩm đã hết hàng!');
    }
  }
}
