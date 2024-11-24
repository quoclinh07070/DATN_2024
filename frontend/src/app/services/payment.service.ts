import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private baseUrl = environment.apiUrl + "/payment";

  private paymentStatusSubject = new BehaviorSubject<string>(''); // Trạng thái thanh toán
  paymentStatus$ = this.paymentStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Tạo yêu cầu thanh toán qua MoMo
  createPayment(amount: number, orderId: string, orderInfo: string) {
    const payload = {
      amount,
      orderId,
      orderInfo
    };

    return this.http.post<any>(`${this.baseUrl}/create-payment`, payload);
  }


  // Gửi thông tin đơn hàng COD
  submitCODOrder(orderData: any) {
    return this.http.post<any>(`${this.baseUrl}/submit-cod-order`, orderData);
  }

  // Xử lý callback từ MoMo (Sau khi thanh toán)
  handlePaymentCallback(data: any) {
    // Kiểm tra mã kết quả và thông báo trạng thái thanh toán
    if (data.resultCode === '0') {
      this.paymentStatusSubject.next('Thanh toán thành công');
    } else {
      this.paymentStatusSubject.next('Thanh toán thất bại');
    }
  }

  // Kiểm tra trạng thái thanh toán (Nếu cần)
  checkPaymentStatus(orderId: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/payment/check-status`, { orderId });
  }
}
