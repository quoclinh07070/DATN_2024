import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';  // Import CartService
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   // Import FormsModule

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // Tải giỏ hàng từ CartService
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart(); // Cập nhật giỏ hàng sau khi xóa sản phẩm
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity); // Cập nhật số lượng trong giỏ hàng
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity); // Cập nhật số lượng trong giỏ hàng
    }
  }

  // Tính tổng tiền
  getTotal() {
    return this.cartService.getTotal();
  }

  // Xóa tất cả sản phẩm trong giỏ
  clearCart() {
    this.cartService.clearCart();
    this.loadCart(); // Cập nhật giỏ hàng sau khi xóa tất cả sản phẩm
  }
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }
  // Xử lý khi số lượng thay đổi
  validateQuantity(item: any) {
    if (item.quantity < 1) {
      item.quantity = 1; // Nếu số lượng nhỏ hơn 1, đặt lại là 1
    }
  }
}
