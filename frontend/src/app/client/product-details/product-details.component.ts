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

  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  isLoggedIn: boolean = false;

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

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItem = this.cartService.getCartItems().find(item => item.id === product.id);
  
    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ, kiểm tra số lượng hiện tại và tồn kho
      if (existingItem.quantity < product.quantity) {
        // Nếu số lượng trong giỏ nhỏ hơn tồn kho, tăng số lượng lên
        existingItem.quantity++;
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        // Nếu số lượng trong giỏ đã bằng hoặc vượt quá số lượng tồn kho
        alert('Số lượng sản phẩm vượt quá số lượng tồn kho!');
        return; // Dừng lại không thêm vào giỏ
      }
    } else {
      // Nếu sản phẩm chưa có trong giỏ, thêm mới vào giỏ
      if (product.quantity > 0) {
        this.cartService.addToCart(product);
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        // Nếu sản phẩm không còn hàng, thông báo lỗi
        alert('Sản phẩm đã hết hàng!');
      }
    }
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