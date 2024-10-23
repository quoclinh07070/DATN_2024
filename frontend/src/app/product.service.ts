import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';  // Địa chỉ API backend

  constructor(private http: HttpClient) { }

  // Gọi API để thêm sản phẩm mới
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product);
  }
}
