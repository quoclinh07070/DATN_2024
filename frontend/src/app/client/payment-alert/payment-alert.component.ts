// payment-alert.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-payment-alert',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-alert.component.html',
  styleUrl: './payment-alert.component.css',
})

export class PaymentAlertComponent implements OnInit {
  paymentStatus: string = '';
  orderId: string = '';
  resultCode: string = '';
  message: string = '';
  amount: string = '';
  transId: string = '';
  orderInfo: string = '';

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit() {
    // Lấy các tham số từ URL
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.resultCode = params['resultCode'];
      this.message = params['message'];
      this.amount = params['amount'];
      this.transId = params['transId'];
      this.orderInfo = params['orderInfo'];

      // Xử lý kết quả thanh toán
      if (this.resultCode === '0') {
        this.paymentStatus = 'Thanh toán thành công!';
      } else if (this.resultCode === '1') {
        this.paymentStatus = 'Thanh toán thất bại!';
      } else {
        this.paymentStatus = 'Đang xử lý';
      }

      // Gọi API để lưu trạng thái nếu cần
      this.paymentService.handlePaymentCallback({
        resultCode: this.resultCode,
        message: this.message,
        orderId: this.orderId,
        transId: this.transId
      });
    });
  }
}
