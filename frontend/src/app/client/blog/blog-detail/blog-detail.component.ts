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
    this.getAllCategories();  // Fetch categories when the component is initialized
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




  postcategories: any[] = [];  // Array to store all categories
  filteredCategories: any[] = [];  // Array to store filtered categories based on search
  searchTerm: string = '';  // Variable to store the search term

  // Function to fetch all categories
  getAllCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.postcategories = response.postcategories;  // Store categories in postcategories
        this.filteredCategories = this.postcategories;  // Initially, show all categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Function to filter categories based on the search term
  filterCategories(): void {
    if (this.searchTerm) {
      // Filter categories by name using the search term (case-insensitive)
      this.filteredCategories = this.postcategories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If there's no search term, show all categories
      this.filteredCategories = this.postcategories;
    }
  }
  
}
