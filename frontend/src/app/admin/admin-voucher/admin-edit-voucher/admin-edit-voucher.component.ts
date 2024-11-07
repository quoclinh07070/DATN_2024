import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../services/voucher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-voucher',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-edit-voucher.component.html',
  styleUrls: ['./admin-edit-voucher.component.css']
})
export class AdminEditVoucherComponent implements OnInit {
  voucher: any = {
    price: 0,
    discount_percent: 0,
    status: 'active'
  };
  voucherId: number | null = null;

  constructor(
    private voucherService: VoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.voucherId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.voucherId) {
      this.getVoucher(this.voucherId);
    }
  }

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

  editVoucher(): void {
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
  }
}
