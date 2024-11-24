<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Đảm bảo đã import Observable
=======
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
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
<<<<<<< HEAD
  updateUser(id: number, updateData: any) {
    return this.http.put(`${this.baseUrl}/${id}`, updateData);
  }  
=======
  updateUser(id: number, user: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

  // Xóa người dùng
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

<<<<<<< HEAD
  // Gửi email thông báo
  sendEmail(email: string, fullName: string): Observable<any> {
    const emailApiUrl = `${environment.apiUrl}/send-email`; // Sử dụng biến môi trường
    return this.http.post(emailApiUrl, { email, fullName });
  }

  sendWelcomeEmail(email: string, name: string): Observable<any> {
    const welcomeEmailApiUrl = `${environment.apiUrl}/send-welcome-email`; // API endpoint cho email chúc mừng
    return this.http.post(welcomeEmailApiUrl, { email, name });
  }

=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  // Phương thức để lấy URL hình ảnh (nếu cần dùng cho avatar hoặc hình đại diện của user)
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
}
