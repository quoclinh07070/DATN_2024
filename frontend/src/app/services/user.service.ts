// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  // import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + "/users";
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách
  getAllUsers(){
    return this.http.get(this.baseUrl);
  }

  // Lấy theo ID
  getUserById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Cập nhật
  updateUser(id: number, user: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  // // Xóa
  deleteUser(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
  
}
