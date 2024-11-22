import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPost(this.postId);
    }
  }
  
  getImageUrl(imageName: string): string {
    return this.postService.getImageUrl(imageName);
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

  // constructor(private postService: PostService) {
  //   registerLocaleData(localeVi, 'vi');  // Đăng ký locale tiếng Việt
  // }

  // ngOnInit(): void {
  //   this.getAllPosts();
  // }

  // getImageUrl(imageName: string): string {
  //   return this.postService.getImageUrl(imageName);
  // }
  
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
}
