<<<<<<< HEAD
import { Component,OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CartService } from '../../services/cart.service';  // Import CartService
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
=======
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Sửa styleUrl thành styleUrls
})
<<<<<<< HEAD
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  cartItems: any[] = [];

  constructor(private router: Router,private cartService: CartService ) {}

  ngOnInit(): void {
    this.loadCart();
    // Subscribe để lắng nghe sự thay đổi của giỏ hàng 
    this.cartService.cartItems$.subscribe(items => { this.cartItems = items; });
  }
  

  // Hàm xử lý tìm kiếm khi người dùng submit form
  onSearchSubmit(event: Event) {
    event.preventDefault();  // Ngăn chặn form tự động reload trang
    if (this.searchValue.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchValue } });  // Điều hướng tới trang kết quả tìm kiếm
    }
  }

  // Tải giỏ hàng từ CartService
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }
=======
export class HeaderComponent {
  userName: string | null = null;
>>>>>>> ba55266b582d2e1d084af9c54fb4be332359bff7

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Kiểm tra nếu đang trong môi trường trình duyệt trước khi sử dụng localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('userName');
    }
  }
}
