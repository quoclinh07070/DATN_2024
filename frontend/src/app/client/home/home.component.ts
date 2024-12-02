import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PostService } from '../../services/post.service'; // Import PostService
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Tất cả sản phẩm
  newestProducts: any[] = []; // Sản phẩm mới nhất
  posts: any[] = []; // Danh sách bài viết

  constructor(
    private productService: ProductService,
    private postService: PostService, // Inject PostService
    private cartService: CartService,
    private chatbotService: ChatbotService
  ) {}

  ngOnInit(): void {
    this.getNewestProducts(); // Lấy sản phẩm mới nhất
    this.getAllPosts(); // Lấy danh sách bài viết
  }

  // Lấy danh sách sản phẩm mới nhất
  getNewestProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;
        this.newestProducts = this.products
          .sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .slice(0, 8); // Giới hạn 8 sản phẩm
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  // Lấy danh sách bài viết
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts.slice(0, 3); // Lấy tối đa 6 bài viết
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  // Lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any, quantity: number = 1): void {
    if (product.quantity > 0) {
      const success = this.cartService.addToCart(product, quantity);
      if (success) {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        alert('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    } else {
      alert('Sản phẩm đã hết hàng!');
    }
  }

  // messages: { user: string; text: string }[] = [];
  // userMessage: string = '';
  // sendMessage() {
  //   if (this.userMessage.trim()) {
  //     this.messages.push({ user: 'Bạn', text: this.userMessage });
  //     this.chatbotService.sendMessage(this.userMessage).subscribe((response) => {
  //       this.messages.push({ user: 'Bot', text: response.reply });
  //     });
  //     this.userMessage = '';
  //   }
  // }
}
