import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [OrderService],
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  orders: any[] = [];  // Khai báo mảng để lưu trữ đơn hàng

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();  // Gọi hàm khi component được khởi tạo
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;  // Gán dữ liệu vào mảng orders
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    );
  }

  deleteOrder(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          // Cập nhật danh sách đơn hàng sau khi xóa
          this.orders = this.orders.filter(order => order.id !== id);
          alert('Đơn hàng đã được xóa thành công!');
          console.log('Đơn hàng đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa đơn hàng!');
          console.error('Lỗi khi xóa đơn hàng:', error);
        }
      );
    }
  }
  
}
