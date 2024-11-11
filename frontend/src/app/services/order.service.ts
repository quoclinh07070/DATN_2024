// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl + "/orders";

  constructor(private http: HttpClient) {}

  // Lấy danh sách đơn hàng
  getAllOrders() {
    return this.http.get(this.baseUrl);
  }

  // Lấy đơn hàng theo ID
  getOrderById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm đơn hàng mới
//   createOrder(order: any) {
//     return this.http.post(this.baseUrl, order);
//   }

  // Cập nhật đơn hàng
  updateOrder(id: number, order: any) {
    return this.http.put(`${this.baseUrl}/${id}`, order);
  }

  // Xóa đơn hàng
  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
