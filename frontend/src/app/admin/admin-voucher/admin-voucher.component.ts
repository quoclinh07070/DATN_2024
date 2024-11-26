import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng *ngFor và *ngIf
<<<<<<< HEAD
import { VoucherService } from '../../services/voucher.service';
import { FormsModule } from '@angular/forms';
=======
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

@Component({
  selector: 'app-admin-voucher',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // Thêm CommonModule vào imports
  templateUrl: './admin-voucher.component.html',
  styleUrls: ['./admin-voucher.component.css']
})
export class AdminVoucherComponent implements OnInit {
<<<<<<< HEAD
  vouchers: any[] = [];  // Khai báo mảng để lưu trữ voucher
  filteredVouchers: any[] = [];  // Mảng lưu trữ các voucher sau khi lọc
  selectedStatus: string = '';  // Biến lưu trữ trạng thái đã chọn cho lọc

  constructor(private voucherService: VoucherService) {}

=======
  // Tạo dữ liệu voucher tĩnh (giả lập)
  vouchers = [
    { id: 1, price: 100.00, discount_percent: 10, status: 'active' },
    { id: 2, price: 200.00, discount_percent: 15, status: 'inactive' },
    { id: 3, price: 300.00, discount_percent: 20, status: 'active' }
  ];

  constructor() { }

>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  ngOnInit(): void {
    // Không cần gọi API, chỉ dùng dữ liệu tĩnh
  }

<<<<<<< HEAD
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
    if (confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
      this.voucherService.deleteVoucher(id).subscribe(
        () => {
          // Cập nhật danh sách voucher sau khi xóa
          this.vouchers = this.vouchers.filter(voucher => voucher.id !== id);
          this.filterByStatus();  // Lọc lại danh sách voucher sau khi xóa
          alert('Voucher đã được xóa thành công!');
          console.log('Voucher đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa voucher!');
          console.error('Lỗi khi xóa voucher:', error);
        }
      );
    }
  }
}
=======
  // Hàm xóa voucher (chỉ xóa trên client, không tương tác với backend)
  deleteVoucher(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
      this.vouchers = this.vouchers.filter(v => v.id !== id);
    }
  }
}
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
