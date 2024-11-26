import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { VoucherService } from '../../../services/voucher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
=======
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-voucher',
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule, RouterLink, CommonModule],
=======
  imports: [ReactiveFormsModule, CommonModule],
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  templateUrl: './admin-edit-voucher.component.html',
  styleUrls: ['./admin-edit-voucher.component.css'] // Sửa từ styleUrl thành styleUrls
})

export class AdminEditVoucherComponent implements OnInit {
<<<<<<< HEAD
  voucher: any = {
    voucher_code: '',
    price: 0,
    discount_percent: 0,
    valid_from: '',
    valid_to: '',
    status: 'active'
  };
  voucherId: number | null = null;
=======
  voucherForm!: FormGroup;
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    // Giả sử bạn đã có thông tin voucher để sửa, bạn sẽ lấy thông tin này từ backend hoặc dịch vụ
    const voucherData = {
      voucherID: '1',
      voucherCode: 'VOUCHER123',
      voucherValue: 50,
      expiryDate: '2024-12-31',
      status: 'active'
    };

    this.voucherForm = this.fb.group({
      voucherID: [voucherData.voucherID],
      voucherCode: [voucherData.voucherCode, Validators.required],
      voucherValue: [voucherData.voucherValue, [Validators.required, Validators.min(1)]],
      expiryDate: [voucherData.expiryDate, Validators.required],
      status: [voucherData.status],
    });
  }

  onSubmit() {
    if (this.voucherForm.invalid) {
      console.log('Form is invalid');
      return;
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
    }

    // Xử lý dữ liệu sửa đổi voucher
    console.log(this.voucherForm.value);
    // Gọi API để cập nhật voucher trong backend
  }
}