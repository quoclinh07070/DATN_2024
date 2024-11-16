import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';  // Đổi thành PostService
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  providers: [PostService],  // Đổi thành PostService
  templateUrl: './admin-post.component.html',  // Đổi thành đường dẫn đến file template của post
  styleUrls: ['./admin-post.component.css']  // Đổi thành đường dẫn đến file CSS của post
})
export class AdminPostComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  showPublishedOnly: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;
        this.filterPosts();  // Initialize filtered list based on current filter
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getImageUrl(imageName: string): string {
    return this.postService.getImageUrl(imageName);
  }

  deletePost(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      this.postService.deletePost(id).subscribe(
        () => {
          this.posts = this.posts.filter(post => post.id !== id);
          this.filterPosts();  // Update filtered list after deletion
          alert('Bài viết đã được xóa thành công!');
        },
        (error) => {
          alert('Lỗi khi xóa bài viết!');
          console.error('Lỗi khi xóa bài viết:', error);
        }
      );
    }
  }

  filterPosts(): void {
    this.filteredPosts = this.showPublishedOnly
      ? this.posts.filter(post => post.status === 'published')
      : this.posts;
  }
}
