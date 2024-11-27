import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';  // Import UserService

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = {
    name: '',
    price: 0,
    image: null,
    description: '',
    discount: 0,
    quantity: 0,
    status: 'active',
    categories_id: ''
  };
  productId: number | null = null;
  reviews: any[] = [];
  newReview: { 
    rating: number; 
    comment: string; 
    user_id: string | null; 
    product_id: number | null; 
    reviews_text: string; 
  } = { 
    rating: 0, 
    comment: '', 
    user_id: null, 
    product_id: null, 
    reviews_text: '' 
  };
  visibleReviews: number = 3;
  displayOption: string = 'latest'; // Biến để theo dõi tùy chọn hiển thị
  filteredReviews: any[] = []; // Mảng chứa các bình luận đã lọc
  selectedRating: number | null = null;


  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService,  // Inject UserService
    private router: Router  // Inject Router
  ) {}

  ngOnInit(): void {
    // Lấy thông tin sản phẩm từ URL
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.getProduct(this.productId);
      this.loadReviews(); // Tải đánh giá khi khởi tạo component
    }

    // Kiểm tra trạng thái đăng nhập và lấy thông tin người dùng từ localStorage
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
      this.userId = localStorage.getItem('userId');
    } else {
      this.userName = null;
      this.userEmail = null;
      this.userId = null;
    }
  }

  // Lấy thông tin chi tiết sản phẩm từ API
  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response.product;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  // Lấy URL của hình ảnh sản phẩm
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }

  // Tải các đánh giá của sản phẩm và lấy thông tin người dùng
  loadReviews(): void {
    if (this.productId) {
      this.reviewService.getProductReviews(this.productId).subscribe(
        (data) => {
          console.log('Product reviews:', data);  // Kiểm tra dữ liệu đánh giá
          this.reviews = data.reviews;
      
          this.reviews.forEach((review) => {
            this.reviewService.getUserById(review.user_id).subscribe(
              (userData: any) => {
                console.log('User data for review:', userData);  
                review.fullname = userData.user.FullName;  
              },
              (error) => {
                console.error('Error fetching user data:', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error loading reviews:', error);
        }
      );
      
    }
  }
  setRatingFilter(rating: number): void {
    this.selectedRating = rating;
    if (rating) {
      this.filteredReviews = this.reviews.filter(review => review.rating === rating);
    } else {
      this.filteredReviews = this.reviews; // Nếu không chọn sao, hiển thị tất cả đánh giá
    }
  }
  loadMore() {
    this.visibleReviews += 3; // Tăng số lượng bình luận hiển thị mỗi lần nhấn
  }
  setDisplayOption(option: string) {
    this.displayOption = option;
    this.filterReviews();
  }

  filterReviews() {
    const currentDate = new Date();
    const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));

    if (this.displayOption === 'latest') {
      this.filteredReviews = this.reviews.filter(review => {
        const reviewDate = new Date(review.created_at);
        return reviewDate >= threeDaysAgo; // Chỉ bao gồm bình luận từ 3 ngày gần đây
      });
    } else {
      this.filteredReviews = this.reviews; // Hiển thị tất cả bình luận nếu không có bộ lọc
    }
  }

  // Gửi đánh giá của người dùng
  submitReview(): void {
    if (this.isLoggedIn) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.newReview.user_id = userId;
        this.newReview.product_id = this.productId;

        // Đảm bảo rằng comment được gửi đúng
        this.newReview.reviews_text = this.newReview.comment;

        this.reviewService.addReview(this.newReview).subscribe(
          (response) => {
            console.log('Đánh giá thành công:', response);
            alert('Gửi đánh giá thành công');
            this.loadReviews();  // Tải lại các đánh giá sau khi gửi thành công
          },
          (error) => {
            console.error('Lỗi khi gửi đánh giá:', error);
            // Kiểm tra mã lỗi trả về từ API
            if (error.status === 403) {
              alert(error.error.message);  // Hiển thị thông báo lỗi từ backend
            } else {
              alert('Lỗi khi gửi đánh giá');
            }
          }
        );
      } else {
        alert('Không tìm thấy thông tin người dùng');
      }
    } else {
      // Nếu người dùng chưa đăng nhập, điều hướng họ đến trang đăng nhập
      alert('Bạn cần đăng nhập để gửi đánh giá');
      this.router.navigate(['/login']);
    }
  }


    
}