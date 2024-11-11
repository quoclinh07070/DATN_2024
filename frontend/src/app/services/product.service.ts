// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getProductUrl = environment.apiUrl + "/products";
  private baseUrl = environment.apiUrl + "/products-filter";
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getProducts(){
    return this.http.get(this.getProductUrl);
  }

  // Lấy danh sách sản phẩm, thêm categoryId vào tham số để lọc theo danh mục
  getAllProducts(minPrice: number | null, maxPrice: number | null, categoryId: number | null): Observable<any> {
    let params = new HttpParams();

    if (minPrice != null && maxPrice != null) {
      params = params.set('minPrice', minPrice.toString());
      params = params.set('maxPrice', maxPrice.toString());
    }
    if (categoryId !== null) {
      params = params.set('categoryId', categoryId.toString());
    }
    
    if (params.keys().length > 0) {
      return this.http.get(this.baseUrl, { params });
    } else {
      return this.http.get(this.baseUrl);
    }
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number) {
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
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }

  // Tìm kiếm sản phẩm
  searchProducts(value: string) {
    // Cập nhật đường dẫn API để sử dụng path params thay vì query string
    return this.http.get(`${this.baseUrl}/search/${value}`);
  }
}
