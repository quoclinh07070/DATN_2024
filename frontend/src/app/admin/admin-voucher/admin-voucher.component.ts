import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng *ngFor và *ngIf
import { VoucherService } from '../../services/voucher.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-voucher',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // Thêm CommonModule vào imports
  templateUrl: './admin-voucher.component.html',
  styleUrls: ['./admin-voucher.component.css']
})
export class AdminVoucherComponent implements OnInit {
  vouchers: any[] = [];  // Khai báo mảng để lưu trữ voucher
  filteredVouchers: any[] = [];  // Mảng lưu trữ các voucher sau khi lọc
  selectedStatus: string = '';  // Biến lưu trữ trạng thái đã chọn cho lọc

  constructor(private voucherService: VoucherService) {}

  ngOnInit(): void {
    this.getAllVouchers();  // Gọi hàm khi component được khởi tạo
  }

  // Lấy tất cả voucher
  getAllVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (response: any) => {
        this.vouchers = response.vouchers;  // Gán dữ liệu vào mảng vouchers
        this.filteredVouchers = this.vouchers;  // Khởi tạo mảng filteredVouchers với tất cả dữ liệu
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu voucher:', error);
      }
    );
  }

  // Lọc voucher theo trạng thái
  filterByStatus(): void {
    if (this.selectedStatus) {
      this.filteredVouchers = this.vouchers.filter(voucher => voucher.status === this.selectedStatus);
    } else {
      this.filteredVouchers = this.vouchers;  // Hiển thị tất cả nếu không có trạng thái chọn
    }
  }

  // Xóa voucher
  deleteVoucher(id: number): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa voucher này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voucherService.deleteVoucher(id).subscribe(
          () => {
            // Cập nhật danh sách voucher sau khi xóa
            this.vouchers = this.vouchers.filter(voucher => voucher.id !== id);
            this.filterByStatus();  // Lọc lại danh sách voucher sau khi xóa
            Swal.fire({
              title: 'Thành công!',
              text: 'Voucher đã được xóa thành công!',
              icon: 'success',
              timer: 2000,  // Đóng tự động sau 2 giây
              showConfirmButton: false
            });
            console.log('Voucher đã được xóa thành công!');
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa voucher!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Lỗi khi xóa voucher:', error);
          }
        );
      }
    });
  }
  
}