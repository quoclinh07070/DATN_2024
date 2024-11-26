<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Đảm bảo đã import Observable
=======
// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  // import { Observable } from 'rxjs';
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
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

<<<<<<< HEAD
  // Thêm người dùng mới
  createUser(user: FormData) {
    return this.http.post(this.baseUrl, user);
  }

  // Cập nhật người dùng
  updateUser(id: number, updateData: any) {
    return this.http.put(`${this.baseUrl}/${id}`, updateData);
  }  
=======
  // Cập nhật
  updateUser(id: number, user: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

  // // Xóa
  deleteUser(id: number){
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

  // Phương thức để lấy URL hình ảnh (nếu cần dùng cho avatar hoặc hình đại diện của user)
=======
  // Thêm phương thức để lấy URL hình ảnh
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
  
}
