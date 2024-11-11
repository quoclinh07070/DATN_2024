import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng *ngFor và *ngIf
import { VoucherService } from '../../services/voucher.service';

@Component({
  selector: 'app-admin-voucher',
  standalone: true,
  imports: [RouterModule, CommonModule], // Thêm CommonModule vào imports
  templateUrl: './admin-voucher.component.html',
  styleUrls: ['./admin-voucher.component.css']
})
export class AdminVoucherComponent implements OnInit {
  vouchers: any[] = [];  // Khai báo mảng để lưu trữ voucher

  constructor(private voucherService: VoucherService) {}
  
  ngOnInit(): void {
    this.getAllVouchers();  // Gọi hàm khi component được khởi tạo
  }
  
  getAllVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (response: any) => {
        this.vouchers = response.vouchers;  // Gán dữ liệu vào mảng vouchers
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu voucher:', error);
      }
    );
  }
  
  deleteVoucher(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
      this.voucherService.deleteVoucher(id).subscribe(
        () => {
          // Cập nhật danh sách voucher sau khi xóa
          this.vouchers = this.vouchers.filter(voucher => voucher.id !== id);
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
