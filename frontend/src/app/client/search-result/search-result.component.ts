// import { Component, OnInit } from '@angular/core';
// import { RouterLink, ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../services/product.service';  // Import service

// @Component({
//   selector: 'app-search-result',
//   standalone: true,
//   imports: [RouterLink, CommonModule],
//   templateUrl: './search-result.component.html',
//   styleUrls: ['./search-result.component.css']
// })
// export class SearchResultComponent implements OnInit {
//   searchValue: string = '';
//   products: any[] = [];
//   errorMessage: string = '';  // Biến để lưu thông báo lỗi

//   constructor(
//     private productService: ProductService,
//     private route: ActivatedRoute  // Inject ActivatedRoute để lấy query params
//   ) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       this.searchValue = params['query'] || '';  // Lấy query param 'query'
  
//       if (this.searchValue.trim() === '') {
//         this.products = [];
//         this.errorMessage = 'Vui lòng nhập từ khóa tìm kiếm.';
//       } else {
//         this.searchProducts();
//       }
//     });
//   }
  
//   // Hàm tìm kiếm sản phẩm
//   searchProducts() {
//     if (this.searchValue.trim() !== '') {
//       this.productService.searchProducts(this.searchValue).subscribe(
//         (response: any) => {
//           this.products = response.products;  // Giả sử API trả về danh sách sản phẩm
//           if (this.products.length === 0) {
//             this.errorMessage = 'Không tìm thấy sản phẩm nào phù hợp với từ khóa này.';
//           } else {
//             this.errorMessage = '';  // Nếu có kết quả, xóa thông báo lỗi
//           }
//         },
//         (error) => {
//           this.products = [];
//           if (error.status === 0) {
//             // Thông báo lỗi khi không thể kết nối tới máy chủ
//             this.errorMessage = 'Không thể kết nối với máy chủ. Vui lòng thử lại sau.';
//           } else if (error.status === 404) {
//             // Nếu API không tìm thấy (404)
//             this.errorMessage = 'Không tìm thấy sản phẩm nào phù hợp với từ khóa này.';
//           } else {
//             // Thông báo lỗi chung nếu có lỗi từ phía API
//             this.errorMessage = `Đã xảy ra lỗi trong quá trình tìm kiếm. Lỗi: ${error.status} - ${error.statusText}. Vui lòng thử lại sau.`;
//           }
//         }
//       );
//     } else {
//       this.products = [];
//       this.errorMessage = 'Vui lòng nhập từ khóa tìm kiếm.';
//     }
//   }
  

//   getImageUrl(imageName: string): string {
//     return this.productService.getImageUrl(imageName); // Gọi phương thức từ service
//   }
// }
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';  // Import service

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
    private route: ActivatedRoute  // Inject ActivatedRoute để lấy query params
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
}
