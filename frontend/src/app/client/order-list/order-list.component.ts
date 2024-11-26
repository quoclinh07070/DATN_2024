import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: any[] = []; // Danh sách đơn hàng
  userID: String | null = null; // ID người dùng hiện tại
  isLoggedIn: boolean = false;


  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Kiểm tra đăng nhập
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userID = localStorage.getItem('userId');
    }
    if (this.userID) {
      this.loadOrders(Number(this.userID)); // Gọi loadOrders và chuyển đổi userID thành số
    }
  }

  // Tải danh sách đơn hàng
  loadOrders(userID: number): void {
    this.orderService.getOrdersByUserId(userID).subscribe({
      next: (response) => {
        this.orders = response.orders; // Trích xuất mảng `orders`
        console.log('Danh sách đơn hàng:', this.orders);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', err);
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'canceled':
        return 'canceled';
      default:
        return '';
    }
  }
}
 