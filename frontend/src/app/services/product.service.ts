// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  // import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl + "/products";
  private imageUrl = environment.imageUrl; 

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
  createProduct(product: FormData) {
    return this.http.post(this.baseUrl, product);
  }

  // Cập nhật sản phẩm
  updateProduct(id: number, product: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  // Xóa sản phẩm
  deleteProduct(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
  
}
