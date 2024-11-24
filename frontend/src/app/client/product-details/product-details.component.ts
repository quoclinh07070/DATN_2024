import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';  // Import UserService
import { CartService } from '../../services/cart.service'; // Import CartService

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
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

  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  isLoggedIn: boolean = false;
  quantity: number = 1;  // Số lượng sản phẩm mặc định là 1

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,  // Inject UserService
    private router: Router,  // Inject Router
    private cartService: CartService // Inject CartService
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
  
  // Hàm giảm số lượng
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Hàm tăng số lượng
  increaseQuantity(): void {
    if (this.quantity < this.product.quantity) {
      this.quantity++;
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any, quantity: number): void {
    if (product.quantity > 0 && quantity <= product.quantity) {
      const success = this.cartService.addToCart(product, quantity);  // Cập nhật số lượng khi thêm vào giỏ hàng

      if (success) {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        alert('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    } else {
      alert('Số lượng vượt quá tồn kho!');
    }
  }

  // Validate số lượng sản phẩm
  validateQuantity(): void {
    if (this.quantity < 1) {
      this.quantity = 1;  // Đảm bảo số lượng không nhỏ hơn 1
    } else if (this.quantity > this.product.quantity) {
      this.quantity = this.product.quantity;  // Điều chỉnh lại số lượng nếu vượt quá kho
      alert('Sản phẩm trong giỏ đã vượt quá tồn kho!');
    }
  }

  // Tải các đánh giá của sản phẩm và lấy thông tin người dùng
  loadReviews(): void {
    if (this.productId) {
      this.reviewService.getProductReviews(this.productId).subscribe(
        (data) => {
          this.reviews = data.reviews;
      
          this.reviews.forEach((review) => {
            this.reviewService.getUserById(review.user_id).subscribe(
              (userData: any) => {
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
            alert('Lỗi khi gửi đánh giá');
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