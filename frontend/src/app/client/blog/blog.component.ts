import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [PostService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  posts: any[] = [];  // Khai báo mảng để lưu trữ bài viết

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();  // Gọi hàm khi component được khởi tạo
  }

  getImageUrl(imageName: string): string {
    return this.postService.getImageUrl(imageName); // Gọi phương thức từ service
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

}
