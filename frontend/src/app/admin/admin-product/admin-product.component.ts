import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

@Component({
  selector: 'app-admin-product',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
=======
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  providers: [ProductService],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
<<<<<<< HEAD
  filteredProducts: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm đã lọc
=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';

<<<<<<< HEAD
  // Khai báo các biến lọc
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedStatus: string = '';

=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }
<<<<<<< HEAD
=======
  
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

  ngOnInit(): void {
    this._getProducts();  // Gọi hàm khi component được khởi tạo
  }

<<<<<<< HEAD
  getAllProducts(): void {
    this.loading = true;
    const { minPrice, maxPrice, categoryId} = this.priceForm.value;

    this.productService.getAllProducts().subscribe(
=======
  // getAllProducts(): void {
  //   this.productService.getAllProducts().subscribe(
  //     (response: any) => {
  //       this.products = response.products;  // Gán dữ liệu vào mảng products
  //     },
  //     (error) => {
  //       console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
  //     }
  //   );
  // }
  
  _getProducts(): void {
    this.loading = true;
    const { minPrice, maxPrice, categoryId} = this.priceForm.value;

    this.productService.getAllProducts(minPrice, maxPrice, categoryId).subscribe(
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
      (response: any) => {
        this.products = response.products;  // Gán dữ liệu vào mảng products
        this.filterProducts();  // Lọc sản phẩm sau khi nhận được dữ liệu
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }
<<<<<<< HEAD

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
=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName); // Gọi phương thức từ service
  }

  // Hàm xóa sản phẩm
deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          // Cập nhật danh sách sản phẩm sau khi xóa
          this.products = this.products.filter(product => product.id !== id);
          alert('Sản phẩm đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa sản phẩm!');
          console.error('Lỗi khi xóa sản phẩm:', error);
        }
      );
    }
  }
}