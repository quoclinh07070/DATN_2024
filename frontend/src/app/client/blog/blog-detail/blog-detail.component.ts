import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostCategoryService } from '../../../services/postcategory.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule,RouterLink,],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  post: any = {
    id: null,
    title: '',
    content: '',
    image_url: null,
    post_category_id: '',
    status: 'draft',
    created_at: '',
    updated_at: ''
  };
  postId: number | null = null;
  isFile: boolean = false;
  categories: any[] = [];  // Mảng lưu danh mục bài viết

  constructor(
    private postService: PostService,
    private postCategoryService: PostCategoryService,  // Inject PostCategoryService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.getAllPostCategories();  // Gọi hàm lấy danh mục bài viết
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPost(this.postId);
    }
  }

  getImageUrl(imageName: string): string {
    return this.postCategoryService.getImageUrl(imageName);  // Sử dụng getImageUrl từ PostCategoryService
  }

  getPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      (response: any) => {
        this.post = response.post;
        this.isFile = typeof this.post.image_url !== 'string';
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  posts: any[] = [];

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  // Phương thức lấy tất cả danh mục bài viết
  getAllPostCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;  // Lưu danh mục vào mảng categories
      },
      (error) => {
        console.error('Lỗi khi lấy danh mục bài viết:', error);
      }
    );
  }
  
}
