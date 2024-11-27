import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service'; // Import service
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostCategoryService } from '../../../services/postcategory.service';

@Component({
  selector: 'app-admin-add-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent {
  post: any = {
    title: '',
    content: '',
    image_url: null,
    post_category_id: '',
    status: 'draft',
    created_at: '',
    updated_at: ''
  };

  fileError: boolean = false;


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileError = false; // Reset lỗi

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.post.image_url = file;
      } else {
        this.fileError = true; // Đặt lỗi nếu tệp không hợp lệ
      }
    }
  }

  addPost(): void {
    if (this.fileError) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    formData.append('image_url', this.post.image_url);
    formData.append('post_category_id', this.post.post_category_id);
    formData.append('status', this.post.status);
    formData.append('created_at', new Date().toISOString()); // Cập nhật thời gian tạo
    formData.append('updated_at', new Date().toISOString()); // Cập nhật thời gian cập nhật

    this.postService.createPost(formData).subscribe(
      (response) => {
        alert('Bài viết đã được thêm!');
        this.router.navigate(['/admin/post']);
      },
      (error) => {
        alert('Lỗi khi thêm bài viết! Vui lòng kiểm tra lại thông tin.');
      }
    );
  }




 
  postId: number | null = null;
  isFile: boolean = false; // Biến để theo dõi nếu image_url là file hay không
  categories: any[] = []; // Danh sách danh mục bài viết

  constructor(
    private postService: PostService,
    private postCategoryService: PostCategoryService, // Inject PostCategoryService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();  // Fetch categories when the component is initialized
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPost(this.postId);
    }
    this.getCategories(); // Lấy danh mục bài viết
  }

  // Lấy thông tin bài viết theo ID
  getPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      (response: any) => {
        this.post = response.post;
        this.isFile = this.post.image_url instanceof File; // Kiểm tra nếu image_url là file
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  // Lấy danh sách danh mục bài viết
  getCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.categories = response.categories; // Giả sử API trả về { categories: [...] }
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    );
  }

  // Hàm kiểm tra dữ liệu trước khi submit
  validateForm(): boolean {
    if (!this.post.title || !this.post.content || !this.post.post_category_id) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
      return false;
    }
    return true;
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

}
