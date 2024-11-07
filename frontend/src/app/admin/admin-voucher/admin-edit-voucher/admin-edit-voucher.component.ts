import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-voucher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-edit-voucher.component.html',
  styleUrls: ['./admin-edit-voucher.component.css'] // Sửa từ styleUrl thành styleUrls
})
export class AdminEditVoucherComponent implements OnInit {
  voucherForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
    }

    // Xử lý dữ liệu sửa đổi voucher
    console.log(this.voucherForm.value);
    // Gọi API để cập nhật voucher trong backend
  }
}
