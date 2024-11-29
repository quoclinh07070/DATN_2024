import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderService],
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  orders: any[] = [];  // Store all orders
  filteredOrders: any[] = [];  // Store filtered orders
  activeTab: string = 'processing';  // Active tab, default to 'processing'

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();  // Fetch all orders on init
  }

  // Get all orders from the service
  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;  // Store orders
        console.log(this.orders)
        this.filterOrdersByStatus();  // Filter orders based on the active tab
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    );
  }

  // Set active tab and filter orders based on status
  setActiveTab(status: string): void {
    this.activeTab = status;
    this.filterOrdersByStatus();  // Filter orders when tab changes
  }

  // Filter orders based on active tab's status
  filterOrdersByStatus(): void {
    if (this.activeTab === 'processing') {
      this.filteredOrders = this.orders.filter(order => order.status === 'processing');
    } else if (this.activeTab === 'delivering') {
      this.filteredOrders = this.orders.filter(order => order.status === 'delivering');
    } else if (this.activeTab === 'canceled') {
      this.filteredOrders = this.orders.filter(order => order.status === 'canceled');
    } else if (this.activeTab === 'completed') {
      this.filteredOrders = this.orders.filter(order => order.status === 'completed');
    }
  }

  // Get the status class based on order status
  getStatusClass(status: string): string {
    switch (status) {
      case 'processing':
        return 'bg-warning';  // Yellow for processing
      case 'delivering':
        return 'bg-primary';  // Blue for delivering
      case 'canceled':
        return 'bg-danger';   // Red for canceled
      case 'completed':
        return 'bg-success';  // Green for completed
      default:
        return '';
    }
  }

  // Get the label for status
  getStatusLabel(status: string): string {
    switch (status) {
      case 'processing':
        return 'Chờ xử lý';
      case 'delivering':
        return 'Đang giao';
      case 'canceled':
        return 'Đã hủy';
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Chưa xác định';
    }
  }

  updateOrderStatus(order: any): void {
    if (order.status !== 'processing') {
      return;  // Không làm gì nếu trạng thái không phải là "Chờ xử lý"
    }
      Swal.fire({
      title: 'Chọn hành động',
      text: 'Bạn muốn duyệt đơn, hủy đơn hay hủy thao tác?',
      showCancelButton: true,
      confirmButtonText: 'Duyệt đơn',
      cancelButtonText: 'Hủy đơn',
      allowOutsideClick: false,  // Ngăn cửa sổ đóng khi nhấn ra ngoài
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger',
      },
      footer: '<button id="cancelAction" class="btn btn-secondary">Hủy thao tác</button>',
    }).then((result) => {
      // Chỉ xử lý nếu người dùng chọn "Duyệt đơn" hoặc "Hủy đơn"
      if (result.isConfirmed) {
      } else if (result.isDismissed) {
      }
    });

    // Lắng nghe sự kiện click vào nút "Hủy thao tác"
    document.getElementById('cancelAction')?.addEventListener('click', () => {
      Swal.close();
    });
}

  
}
