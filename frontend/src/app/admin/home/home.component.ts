import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post.service';
import { VoucherService } from '../../services/voucher.service';
import { UserService } from '../../services/user.service'; // Đảm bảo bạn đã import UserService
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post.service';
import { VoucherService } from '../../services/voucher.service';
import { UserService } from '../../services/user.service'; // Đảm bảo bạn đã import UserService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalQuantity: number = 0;
  totalProductCount: number = 0;
  totalStock: number = 0;
  products: any[] = [];
  filteredProducts: any[] = [];
  chart: any;
  posts: any[] = [];

  totalPostCount: number = 0;
  totalDrafts: number = 0;
  totalPublished: number = 0;

  totalVoucherCount: number = 0;  // Tổng số voucher
  totalActiveVouchers: number = 0;  // Tổng số voucher kích hoạt
  totalInactiveVouchers: number = 0;  // Tổng số voucher vô hiệu hóa
  vouchers: any[] = [];  // Mảng lưu trữ voucher

  totalOrderCount: number = 0;
  totalDeliveredOrders: number = 0;
  totalCancelledOrders: number = 0;

  totalUserCount: number = 0;  // Tổng số người dùng
  totalAdminUsers: number = 0;  // Tổng số người dùng có quyền admin

  totalQuantity: number = 0;
  totalProductCount: number = 0;
  totalStock: number = 0;
  products: any[] = [];
  filteredProducts: any[] = [];
  chart: any;
  posts: any[] = [];

  totalPostCount: number = 0;
  totalDrafts: number = 0;
  totalPublished: number = 0;

  totalVoucherCount: number = 0;  // Tổng số voucher
  totalActiveVouchers: number = 0;  // Tổng số voucher kích hoạt
  totalInactiveVouchers: number = 0;  // Tổng số voucher vô hiệu hóa
  vouchers: any[] = [];  // Mảng lưu trữ voucher

  totalOrderCount: number = 0;
  totalDeliveredOrders: number = 0;
  totalCancelledOrders: number = 0;

  totalUserCount: number = 0;  // Tổng số người dùng
  totalAdminUsers: number = 0;  // Tổng số người dùng có quyền admin

  priceForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedStatus: string = '';

  constructor(
    private productService: ProductService,
    private postService: PostService,
    private voucherService: VoucherService,  // Thêm VoucherService vào constructor
    private userService: UserService,  // Thêm UserService vào constructor
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
  constructor(
    private productService: ProductService,
    private postService: PostService,
    private voucherService: VoucherService,  // Thêm VoucherService vào constructor
    private userService: UserService,  // Thêm UserService vào constructor
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }

  ngOnInit(): void {
    this.getAllVouchers();  // Gọi API lấy danh sách voucher
    this.getAllProducts();
    this.getAllPosts();
    this.getAllUsers();  // Gọi API lấy người dùng
  ngOnInit(): void {
    this.getAllVouchers();  // Gọi API lấy danh sách voucher
    this.getAllProducts();
    this.getAllPosts();
    this.getAllUsers();  // Gọi API lấy người dùng
  }

  getAllProducts(): void {
    this.loading = true;
    const { minPrice, maxPrice, categoryId } = this.priceForm.value;
    const { minPrice, maxPrice, categoryId } = this.priceForm.value;

    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;
        this.totalProductCount = this.products.length;
        this.calculateTotalQuantity();
        this.calculateTotalStock();
        this.filterProducts();
        this.products = response.products;
        this.totalProductCount = this.products.length;
        this.calculateTotalQuantity();
        this.calculateTotalStock();
        this.filterProducts();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  calculateTotalQuantity(): void {
    this.totalQuantity = this.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }

  calculateTotalStock(): void {
    this.totalStock = this.products.reduce(
      (sum, product) => sum + product.stock,
      0
    );
  }

  calculateTotalQuantity(): void {
    this.totalQuantity = this.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }

  calculateTotalStock(): void {
    this.totalStock = this.products.reduce(
      (sum, product) => sum + product.stock,
      0
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
        (this.selectedPriceRange ? this.filterByPriceRange(product.price) : true) &&
        (this.selectedStatus ? product.status === this.selectedStatus : true)
      );
    });
  }

  filterByPriceRange(price: number): boolean {
    if (this.selectedPriceRange === 'low') return price < 1000000;
    if (this.selectedPriceRange === 'medium') return price >= 1000000 && price <= 5000000;
    if (this.selectedPriceRange === 'high') return price > 5000000;
    return true;
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;
        this.calculatePostStats();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getAllVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (response: any) => {
        this.vouchers = response.vouchers;
        this.calculateVoucherStats();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        const users = response.users;
        this.totalUserCount = users.length;  // Tính tổng số người dùng
        this.totalAdminUsers = users.filter((user: any) => user.role === 'admin').length;  // Tính số người dùng là admin
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    );
  }

  calculatePostStats(): void {
    this.totalPostCount = this.posts.length;
    this.totalDrafts = this.posts.filter(post => post.status === 'draft').length;
    this.totalPublished = this.posts.filter(post => post.status === 'published').length;
  }

  // Tính toán tổng số voucher, voucher kích hoạt và vô hiệu hóa
  calculateVoucherStats(): void {
    this.totalVoucherCount = this.vouchers.length;
    this.totalActiveVouchers = this.vouchers.filter(voucher => voucher.status === 'active').length;
    this.totalInactiveVouchers = this.vouchers.filter(voucher => voucher.status === 'inactive').length;
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;
        this.calculatePostStats();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getAllVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (response: any) => {
        this.vouchers = response.vouchers;
        this.calculateVoucherStats();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        const users = response.users;
        this.totalUserCount = users.length;  // Tính tổng số người dùng
        this.totalAdminUsers = users.filter((user: any) => user.role === 'admin').length;  // Tính số người dùng là admin
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    );
  }

  calculatePostStats(): void {
    this.totalPostCount = this.posts.length;
    this.totalDrafts = this.posts.filter(post => post.status === 'draft').length;
    this.totalPublished = this.posts.filter(post => post.status === 'published').length;
  }

  // Tính toán tổng số voucher, voucher kích hoạt và vô hiệu hóa
  calculateVoucherStats(): void {
    this.totalVoucherCount = this.vouchers.length;
    this.totalActiveVouchers = this.vouchers.filter(voucher => voucher.status === 'active').length;
    this.totalInactiveVouchers = this.vouchers.filter(voucher => voucher.status === 'inactive').length;
  }

  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Thêm tính toán cho đơn hàng
  getAllOrders(): void {
    this.http.get<any[]>('/api/orders').subscribe(
      (orders) => {
        this.totalOrderCount = orders.length;
        this.totalDeliveredOrders = orders.filter((order: any) => order.status === 'delivered').length;
        this.totalCancelledOrders = orders.filter((order: any) => order.status === 'cancelled').length;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    );
  }
}

    return this.productService.getImageUrl(imageName);
  }

  // Thêm tính toán cho đơn hàng
  getAllOrders(): void {
    this.http.get<any[]>('/api/orders').subscribe(
      (orders) => {
        this.totalOrderCount = orders.length;
        this.totalDeliveredOrders = orders.filter((order: any) => order.status === 'delivered').length;
        this.totalCancelledOrders = orders.filter((order: any) => order.status === 'cancelled').length;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    );
  }
}
