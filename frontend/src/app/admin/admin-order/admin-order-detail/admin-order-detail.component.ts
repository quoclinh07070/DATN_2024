import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-order-detail.component.html',
  styleUrl: './admin-order-detail.component.css'
})
export class AdminOrderDetailComponent {
  order: any = null;  // Dữ liệu chi tiết đơn hàng

  constructor(
    private route: ActivatedRoute,  // Lấy tham số từ URL
    private orderService: OrderService  // Dịch vụ gọi API
  ) {}

  ngOnInit(): void {
    this.getOrderDetail();  // Lấy thông tin đơn hàng khi component khởi tạo
  }

  getOrderDetail(): void {
    const orderId = this.route.snapshot.paramMap.get('id');  // Lấy id từ URL
    if (!orderId) {
      Swal.fire('Lỗi!', 'Không tìm thấy ID đơn hàng.', 'error');
      return;
    }

    // Chuyển đổi orderId từ string sang number
    const numericOrderId = Number(orderId);
    if (isNaN(numericOrderId)) {
      Swal.fire('Lỗi!', 'ID đơn hàng không hợp lệ.', 'error');
      return;
    }

    this.orderService.getOrderById(numericOrderId).subscribe(
      (response: any) => {
        this.order = response.order;  // Lưu dữ liệu đơn hàng
      },
      (error) => {
        Swal.fire('Lỗi!', 'Không thể tải thông tin đơn hàng.', 'error');
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'processing': return 'bg-warning text-white';
      case 'delivering': return 'bg-primary text-white';
      case 'canceled': return 'bg-danger text-white';
      case 'completed': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'processing': return 'Chờ xử lý';
      case 'delivering': return 'Đang giao hàng';
      case 'canceled': return 'Đã hủy';
      case 'completed': return 'Hoàn thành';
      default: return 'Không xác định';
    }
  }
}
