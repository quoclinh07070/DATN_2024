import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { NotyfService } from '../../services/notyf.service';
@Component({
  selector: 'app-product',  
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './product.component.html', 
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];  
  categories: any[] = [];  
  filteredProducts: any[] = [];  
  priceFilter: number = 0;  
  nameFilter: string = '';  
  minPrice: number = 0;  
  maxPrice: number = 0;  
  selectedCategory: number | null = null; 
  selectedCategoryName: string = '';  
  quantity: number = 1; 
  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private cartService: CartService,
    private notyfService: NotyfService
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
  addToCart(product: any, quantity: number) {
    if (product.quantity > 0) {
      const success = this.cartService.addToCart(product, quantity);  // Gọi service để thêm sản phẩm vào giỏ
  
      if (success) {
        this.notyfService.success('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        this.notyfService.warning('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    } else {
      this.notyfService.error('Sản phẩm đã hết hàng!');
    }
  }
  

  // Hàm sắp xếp sản phẩm
sortProducts(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const sortOption = selectElement.value;

  switch (sortOption) {
    case 'name_asc':
      // Sắp xếp tên sản phẩm theo thứ tự A-Z
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      // Sắp xếp tên sản phẩm theo thứ tự Z-A
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price_asc':
      // Sắp xếp giá sản phẩm từ thấp đến cao
      this.filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      // Sắp xếp giá sản phẩm từ cao đến thấp
      this.filteredProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      // Nếu không có lựa chọn sắp xếp, không thay đổi thứ tự
      this.filteredProducts = [...this.products]; // Trả về danh sách sản phẩm ban đầu
      break;
  }
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
