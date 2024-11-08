import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';  // Import service
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchValue: string = '';
  products: any[] = [];
  errorMessage: string = '';  // Biến để lưu thông báo lỗi

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,  // Inject ActivatedRoute để lấy query params
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['query'] || '';  // Lấy query param 'query'
      this.searchValue.trim() ? this.searchProducts() : this.displayError('Vui lòng nhập từ khóa tìm kiếm.');
    });
  }
  
  // Hàm tìm kiếm sản phẩm
  searchProducts() {
    this.productService.searchProducts(this.searchValue).subscribe(
      (response: any) => {
        this.products = response.products || [];
        this.products.length ? this.clearError() : this.displayError('Không tìm thấy sản phẩm nào phù hợp với từ khóa này.');
      },
      (error) => {
        this.products = [];
        this.displayError(error.status === 0 ? 'Không thể kết nối với máy chủ. Vui lòng thử lại sau.' :
          error.status === 404 ? 'Không tìm thấy sản phẩm nào phù hợp với từ khóa này.' :
          `Đã xảy ra lỗi trong quá trình tìm kiếm. Lỗi: ${error.status} - ${error.statusText}. Vui lòng thử lại sau.`);
      }
    );
  }

  displayError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = '';
  }

  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName); // Gọi phương thức từ service
  }
  // Thêm sản phẩm vào giỏ
  addToCart(product: any) {
    this.cartService.addToCart(product); // Gọi CartService để thêm sản phẩm vào giỏ
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }
  
}
