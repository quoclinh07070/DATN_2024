import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';  // Đổi thành PostService
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [PostService],  // Đổi thành PostService
  templateUrl: './admin-post.component.html',  // Đổi thành đường dẫn đến file template của post
  styleUrls: ['./admin-post.component.css']  // Đổi thành đường dẫn đến file CSS của post
})
export class AdminPostComponent implements OnInit {
  posts: any[] = [];  // Khai báo mảng để lưu trữ bài viết

  constructor(private postService: PostService) {}
  
  ngOnInit(): void {
    this.getAllPosts();  // Gọi hàm khi component được khởi tạo
  }
  
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;  // Gán dữ liệu vào mảng posts
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }
  
  getImageUrl(imageName: string): string {
    return this.postService.getImageUrl(imageName); // Gọi phương thức từ service
  }
  
  deletePost(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      this.postService.deletePost(id).subscribe(
        () => {
          // Cập nhật danh sách bài viết sau khi xóa
          this.posts = this.posts.filter(post => post.id !== id);
          alert('Bài viết đã được xóa thành công!');
          console.log('Bài viết đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa bài viết!');
          console.error('Lỗi khi xóa bài viết:', error);
        }
      );
    }
  }
}
