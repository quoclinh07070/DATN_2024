import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng *ngFor và *ngIf

@Component({
  selector: 'app-admin-voucher',
  standalone: true,
  imports: [RouterModule, CommonModule], // Thêm CommonModule vào imports
  templateUrl: './admin-voucher.component.html',
  styleUrls: ['./admin-voucher.component.css']
})
export class AdminVoucherComponent implements OnInit {
  // Tạo dữ liệu voucher tĩnh (giả lập)
  vouchers = [
    { id: 1, price: 100.00, discount_percent: 10, status: 'active' },
    { id: 2, price: 200.00, discount_percent: 15, status: 'inactive' },
    { id: 3, price: 300.00, discount_percent: 20, status: 'active' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Không cần gọi API, chỉ dùng dữ liệu tĩnh
  }

  // Hàm xóa voucher (chỉ xóa trên client, không tương tác với backend)
  deleteVoucher(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
      this.vouchers = this.vouchers.filter(v => v.id !== id);
    }
  }
}
