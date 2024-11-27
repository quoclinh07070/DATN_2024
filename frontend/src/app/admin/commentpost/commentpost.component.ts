import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentPostService } from '../../services/commentpost.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commentpost',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './commentpost.component.html',
  styleUrl: './commentpost.component.css'
})
export class CommentpostComponent {
  commentposts: any[] = []; // Mảng lưu trữ danh sách bình luận
  filteredComments: any[] = []; // Danh sách bình luận sau khi lọc
  selectedStatus: string = ''; // Trạng thái được chọn

    currentPage: number = 1;
    itemsPerPage: number = 8; 

  constructor(private commentPostService: CommentPostService) {}

  ngOnInit(): void {
    this.getAllCommentPosts(); // Gọi hàm khi component được khởi tạo
  }

  // Lấy danh sách tất cả bình luận
  getAllCommentPosts(): void {
    this.commentPostService.getAllCommentPosts().subscribe(
      (response: any) => {
        if (response.comments && Array.isArray(response.comments)) {
          this.commentposts = response.comments; // Gán dữ liệu vào mảng commentposts
          this.filterComments(); // Lọc bình luận ngay sau khi lấy dữ liệu
        } else {
          console.error('Dữ liệu API trả về không hợp lệ.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Lỗi khi lấy danh sách bình luận:', error.message);
      }
    );
  }

  filterComments(): void {
    this.filteredComments = this.commentposts.filter((comment) => {
      return (
        this.selectedStatus
          ? comment.status === this.selectedStatus
          : true
      );
    });
  }

  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredComments.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredComments.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Lấy đường dẫn ảnh nếu cần (có thể loại bỏ nếu không dùng)
  getImageUrl(imageName: string): string {
    // Trường hợp nếu API trả về ảnh hoặc muốn xử lý đường dẫn ảnh
    return `https://your-api.com/images/${imageName}`; 
  }

  // Xóa một bình luận
  deleteCommentPost(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) {
      this.commentPostService.deleteComment(id).subscribe(
        () => {
          // Cập nhật danh sách sau khi xóa
          this.commentposts = this.commentposts.filter((comment) => comment.id !== id);
          this.filterComments();
          alert('Bình luận đã được xóa thành công!');
          console.log('Bình luận đã được xóa thành công!');
        },
        (error: HttpErrorResponse) => {
          alert('Lỗi khi xóa bình luận!');
          console.error('Lỗi khi xóa bình luận:', error.message);
        }
      );
    }
  }
}
