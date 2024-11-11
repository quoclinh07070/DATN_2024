import { Component,OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CartService } from '../../services/cart.service';  // Import CartService
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
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

}
