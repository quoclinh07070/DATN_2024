import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {
  reviews: any[] = [];
  filteredReviews: any[] = [];  // Add this property for filtered reviews
  productId: number = 1; // ID của sản phẩm mà bạn muốn hiển thị đánh giá

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews(); // Load các đánh giá của sản phẩm
  }

  // Lấy tất cả đánh giá của sản phẩm
  loadReviews(): void {
    // Fetch all reviews (no filtering by productId)
    this.reviewService.getAllReviews().subscribe(
      (data) => {
        console.log('iews:', data);  // Check the review data
        this.reviews = data.reviews;
        this.filteredReviews = this.reviews;  // Initially, show all reviews
  
        // Create an array of observables to get user information for each review
        const userRequests = this.reviews.map((review) =>
          this.reviewService.getUserById(review.user_id)
        );
  
        // Use forkJoin to wait for all user data fetches to complete
        forkJoin(userRequests).subscribe(
          (userResponses: any[]) => {
            // Update fullname for each review after user data is fetched
            userResponses.forEach((userData, index) => {
              this.reviews[index].fullname = userData.user.FullName;
            });
          },
          (error) => {
            console.error('Error fetching user data:', error);
            alert('Có lỗi xảy ra khi tải dữ liệu người dùng.');
          }
        );
      },
      (error) => {
        console.error('Error loading reviews:', error);
        alert('Có lỗi xảy ra khi tải danh sách đánh giá.');
      }
    );
  }
  

  // Hàm để ẩn hoặc hiện đánh giá
  toggleReviewStatus(reviewId: number): void {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      // Đảo trạng thái của review (nếu đang ẩn thì hiện, ngược lại)
      const newStatus = review.status === 1 ? 0 : 1;

      // Payload gửi lên API, chỉ có trường status
      const payload = { status: newStatus };

      // Cập nhật trạng thái đánh giá qua service
      this.reviewService.updateReviewStatus(reviewId, payload).subscribe(
        (response) => {
          alert(`Trạng thái đánh giá đã được ${newStatus === 1 ? 'hiện' : 'ẩn'}`);
          review.status = newStatus; // Cập nhật trạng thái trong UI
          this.filteredReviews = this.reviews;  // Update filteredReviews if necessary
        },
        (error) => {
          console.error('Lỗi cập nhật trạng thái:', error);
          alert('Có lỗi xảy ra khi cập nhật trạng thái đánh giá');
        }
      );
    }
  }
}

