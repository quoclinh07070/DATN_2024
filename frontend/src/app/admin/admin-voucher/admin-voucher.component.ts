import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng *ngFor và *ngIf
import { VoucherService } from '../../services/voucher.service';
import { FormsModule } from '@angular/forms';

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

  // Thuộc tính phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 4; // Số mục hiển thị trên mỗi trang

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

  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredVouchers.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredVouchers.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
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