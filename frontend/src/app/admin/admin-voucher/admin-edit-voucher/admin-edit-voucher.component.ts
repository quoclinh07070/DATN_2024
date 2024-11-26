import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../services/voucher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-voucher',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-edit-voucher.component.html',
  styleUrls: ['./admin-edit-voucher.component.css']
})

export class AdminEditVoucherComponent implements OnInit {
  voucher: any = {
    voucher_code: '',
    price: 0,
    discount_percent: 0,
    valid_from: '',
    valid_to: '',
    status: 'active'
  };
  voucherId: number | null = null;

  constructor(
    private voucherService: VoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy ID từ URL và gọi API để lấy voucher khi sửa
    this.voucherId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.voucherId) {
      this.getVoucher(this.voucherId);
    }
  }

  // Lấy voucher từ API
  getVoucher(id: number): void {
    this.voucherService.getVoucherById(id).subscribe(
      (response: any) => {
        this.voucher = response.voucher;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu voucher:', error);
      }
    );
  }

  // Cập nhật voucher khi form hợp lệ
  editVoucher(form: NgForm): void {
    if (form.valid) {
      if (this.voucherId) {
        this.voucherService.updateVoucher(this.voucherId, this.voucher).subscribe(
          (response) => {
            alert('Voucher đã được cập nhật!');
            console.log('Voucher đã được cập nhật:', response);
            this.router.navigate(['/admin/voucher']); // Chuyển hướng về danh sách voucher
          },
          (error) => {
            alert('Lỗi khi cập nhật voucher!');
            console.error('Lỗi khi cập nhật voucher:', error);
          }
        );
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }
}