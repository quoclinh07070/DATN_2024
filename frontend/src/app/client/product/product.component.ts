import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Dịch vụ lấy dữ liệu sản phẩm
import { CategoryService } from '../../services/category.service';  // Dịch vụ lấy dữ liệu danh mục sản phẩm
import { RouterLink } from '@angular/router';  // Để sử dụng điều hướng (routerLink) trong template
import { CartService } from '../../services/cart.service';  // Dịch vụ quản lý giỏ hàng
import { CommonModule } from '@angular/common';  // Thư viện Angular giúp sử dụng các tính năng chung
import { FormsModule } from '@angular/forms';  // Dùng cho các tính năng form, ngModel

@Component({
  selector: 'app-product',  // Chỉ định selector cho component này
  standalone: true,  // Component này độc lập, không cần module
  imports: [RouterLink, CommonModule, FormsModule],  // Các module cần thiết cho component
  templateUrl: './product.component.html',  // Đường dẫn tới file HTML của component
  styleUrls: ['./product.component.css'],  // Đường dẫn tới file CSS của component
})
export class ProductComponent implements OnInit {
  products: any[] = [];  // Mảng chứa tất cả sản phẩm
  categories: any[] = [];  // Mảng chứa tất cả danh mục sản phẩm
  filteredProducts: any[] = [];  // Mảng chứa các sản phẩm đã được lọc
  priceFilter: number = 0;  // Biến dùng để lọc theo giá (tối thiểu hoặc tối đa)
  nameFilter: string = '';  // Biến dùng để lọc theo tên sản phẩm
  minPrice: number = 0;  // Biến giá tối thiểu khi lọc
  maxPrice: number = 0;  // Biến giá tối đa khi lọc
  selectedCategory: number | null = null;  // Biến lưu trữ id của danh mục được chọn
  selectedCategoryName: string = '';  // Biến lưu tên danh mục đã chọn

  constructor(
    private productService: ProductService,  // Inject dịch vụ lấy sản phẩm
    private categoryService: CategoryService,  // Inject dịch vụ lấy danh mục sản phẩm
    private cartService: CartService  // Inject dịch vụ giỏ hàng
  ) {}

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm lấy tất cả sản phẩm khi component khởi tạo
    this.getAllCategories();  // Gọi hàm lấy tất cả danh mục khi component khởi tạo
  }

  // Lấy tất cả sản phẩm từ API
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;  // Lưu trữ tất cả sản phẩm vào biến products
        this.filteredProducts = this.products;  // Mặc định, hiển thị tất cả sản phẩm
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);  // In ra lỗi nếu có sự cố
      }
    );
  }

  // Lấy tất cả danh mục sản phẩm từ API
  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;  // Lưu trữ tất cả danh mục vào biến categories
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);  // In ra lỗi nếu có sự cố
      }
    );
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    this.cartService.addToCart(product);  // Gọi dịch vụ giỏ hàng để thêm sản phẩm
    alert('Sản phẩm đã được thêm vào giỏ hàng!');  // Hiển thị thông báo
  }

  // Hàm lọc các sản phẩm theo các điều kiện (giá, tên, danh mục)
  applyFilters(): void {
    // Lọc các sản phẩm dựa trên giá, tên và danh mục
    this.filteredProducts = this.products.filter(product => {
      const isPriceInRange = (this.minPrice ? product.price >= this.minPrice : true) &&
                             (this.maxPrice ? product.price <= this.maxPrice : true);  // Kiểm tra giá trong khoảng
      const isNameMatch = this.nameFilter.trim() === '' || product.name.toLowerCase().includes(this.nameFilter.toLowerCase());  // Kiểm tra tên sản phẩm
      const isCategoryMatch = this.selectedCategory ? product.categories_id === this.selectedCategory : true;  // Kiểm tra danh mục sản phẩm

      return isPriceInRange && isNameMatch && isCategoryMatch;  // Trả về các sản phẩm thỏa mãn tất cả các điều kiện
    });
  }

  // Lọc sản phẩm theo danh mục (dựa trên sự kiện từ select box)
  filterByCategory(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;  // Lấy phần tử select từ sự kiện
    const categoryId = selectElement.value === 'null' ? null : parseInt(selectElement.value, 10);  // Lấy id danh mục chọn

    this.selectedCategory = categoryId;  // Lưu lại id danh mục đã chọn

    // Nếu có id danh mục, tìm tên danh mục và lưu lại
    if (categoryId) {
      const selectedCategory = this.categories.find(c => c.id === categoryId);  // Tìm danh mục theo id
      this.selectedCategoryName = selectedCategory ? selectedCategory.category_name : '';  // Lưu tên danh mục
    } else {
      this.selectedCategoryName = '';  // Nếu không chọn danh mục, đặt tên danh mục là rỗng
    }

    this.applyFilters();  // Áp dụng bộ lọc sau khi chọn danh mục
  }

  // Lấy URL của ảnh sản phẩm
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);  // Gọi dịch vụ để lấy URL của ảnh sản phẩm
  }
}
