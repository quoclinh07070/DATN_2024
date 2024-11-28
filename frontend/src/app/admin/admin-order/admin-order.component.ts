import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],  // Include FormsModule here
  providers: [OrderService],
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  orders: any[] = [];  // Store all orders
  filteredOrders: any[] = [];  // Store filtered orders
  filterName: string = '';  // Filter input for name
  filterStatus: string = '';  // Filter input for status


  currentPage: number = 1;
  itemsPerPage: number = 10; 

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
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe(
          () => {
            // Remove deleted order from both orders and filteredOrders
            this.orders = this.orders.filter(order => order.id !== id);
            this.filteredOrders = this.filteredOrders.filter(order => order.id !== id);
  
            Swal.fire({
              title: 'Thành công!',
              text: 'Đơn hàng đã được xóa thành công!',
              icon: 'success',
              timer: 2000,  // Đóng tự động sau 2 giây
              showConfirmButton: false
            });
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa đơn hàng!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Lỗi khi xóa đơn hàng:', error);
          }
        );
      }
    });
  }

  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Method to filter orders based on name and status
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesName = order.address.toLowerCase().includes(this.filterName.toLowerCase()) || order.phone_number.includes(this.filterName);
      const matchesStatus = this.filterStatus ? order.status === this.filterStatus : true;
      return matchesName && matchesStatus;
    });
  }
}
