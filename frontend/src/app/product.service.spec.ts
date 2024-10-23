import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  createProduct // Thêm sản phẩm mới
    (product: any) {
      throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/api/products';  // URL của API từ backend

  constructor(private http: HttpClient) { }

  // Lấy danh sách sản phẩm
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Thêm sản phẩm mới
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Cập nhật sản phẩm
  updateProduct(productId: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, product);
  }

  // Xóa sản phẩm
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}

