import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // getCategories() {
  //   throw new Error('Method not implemented.');
  // }
  private baseUrl = environment.apiUrl + "/products";
  // private api = "https://fakestoreapi.com/products";
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  // Lấy danh sách sản phẩm
  getAllProducts() {
    return this.http.get(this.baseUrl);
  }
=======
  // Lấy danh sách sản phẩm, thêm categoryId vào tham số để lọc theo danh mục
  getAllProducts(minPrice: number | null, maxPrice: number | null, categoryId: number | null): Observable<any> {
    let params = new HttpParams();
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

    if (minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== null) {
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
<<<<<<< HEAD

  // Tìm kiếm sản phẩm
  searchProducts(value: string) {
    // Cập nhật đường dẫn API để sử dụng path params thay vì query string
    return this.http.get(`${this.baseUrl}/search/${value}`);
  }
}
=======
}
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
