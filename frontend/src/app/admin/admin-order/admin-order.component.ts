<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
=======
import { Component } from '@angular/core';
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

@Component({
  selector: 'app-admin-order',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, CommonModule, FormsModule],  // Include FormsModule here
  providers: [OrderService],
=======
  imports: [],
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css'
})
<<<<<<< HEAD
export class AdminOrderComponent implements OnInit {
  orders: any[] = [];  // Store all orders
  filteredOrders: any[] = [];  // Store filtered orders
  filterName: string = '';  // Filter input for name
  filterStatus: string = '';  // Filter input for status

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();  // Fetch all orders on init
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;  // Store orders
        this.filteredOrders = this.orders;  // Initialize filteredOrders with all orders
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
          // Remove deleted order from both orders and filteredOrders
          this.orders = this.orders.filter(order => order.id !== id);
          this.filteredOrders = this.filteredOrders.filter(order => order.id !== id);
          alert('Đơn hàng đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa đơn hàng!');
          console.error('Lỗi khi xóa đơn hàng:', error);
        }
      );
    }
  }

  // Method to filter orders based on name and status
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesName = order.address.toLowerCase().includes(this.filterName.toLowerCase()) || order.phone_number.includes(this.filterName);
      const matchesStatus = this.filterStatus ? order.status === this.filterStatus : true;
      return matchesName && matchesStatus;
    });
  }
=======
export class AdminOrderComponent {

>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
}
