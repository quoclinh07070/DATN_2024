import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-voucher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-voucher.component.html',
  styleUrls: ['./admin-add-voucher.component.css'] // Sửa từ styleUrl thành styleUrls
})
export class AdminAddVoucherComponent implements OnInit {
  voucherForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Di chuyển việc khởi tạo voucherForm vào ngOnInit
    this.voucherForm = this.fb.group({
      voucherID: [''],
      voucherCode: ['', Validators.required],
      voucherValue: ['', [Validators.required, Validators.min(1)]],
      expiryDate: ['', Validators.required],
      status: ['active'],
    });
  }

  onSubmit() {
    if (this.voucherForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log(this.voucherForm.value);
  }
}
