// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + "/users";
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách người dùng
  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  // Lấy người dùng theo ID
  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm người dùng mới
  createUser(user: FormData) {
    return this.http.post(this.baseUrl, user);
  }

  // Cập nhật người dùng
  updateUser(id: number, user: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  // Xóa người dùng
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Phương thức để lấy URL hình ảnh (nếu cần dùng cho avatar hoặc hình đại diện của user)
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
}
