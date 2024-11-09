import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Thêm import này để sử dụng currency pipe
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any = {
    name: '',
    price: 0,
    image: null,
    description: '',
    discount: 0,
    quantity: 0,
    status: 'active',
    categories_id: ''
  };
  productId: number | null = null;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.getProduct(this.productId);
    }
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response.product;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Thêm sản phẩm vào giỏ
  addToCart(product: any) {
    this.cartService.addToCart(product); // Gọi CartService để thêm sản phẩm vào giỏ
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }
  
}
