import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.apiUrl + "/posts";  // Thay 'products' thành 'posts'

  constructor(private http: HttpClient) {}

  // Lấy danh sách bài đăng
  getAllPosts(){
    return this.http.get(this.baseUrl);
  }

  // Lấy bài đăng theo ID
  getPostById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm bài đăng mới
  createPost(post: any){
    return this.http.post(this.baseUrl, post);
  }

  // Cập nhật bài đăng
  updatePost(id: number, post: any){
    return this.http.put(`${this.baseUrl}/${id}`, post);
  }

  // Xóa bài đăng
  deletePost(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
