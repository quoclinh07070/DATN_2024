import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  // import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl + "/products";

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getAllProducts(){
    return this.http.get(this.baseUrl);
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm sản phẩm mới
  createProduct(product: any){
    return this.http.post(this.baseUrl, product);
  }

  // Cập nhật sản phẩm
  updateProduct(id: number, product: any){
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  // Xóa sản phẩm
  deleteProduct(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}