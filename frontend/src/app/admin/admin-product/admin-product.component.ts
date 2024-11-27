import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ProductService],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm
  filteredProducts: any[] = [];  // Khai báo mảng để lưu trữ sản phẩm đã lọc
  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';

  // Khai báo các biến lọc
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedStatus: string = '';

  // Thuộc tính phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 4; // Số mục hiển thị trên mỗi tran

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm khi component được khởi tạo
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

  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Hàm lấy đường dẫn hình ảnh
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