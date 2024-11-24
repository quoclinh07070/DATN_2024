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
<<<<<<< HEAD
    this.productService.getProductById(item.id).subscribe((response: any) => {
      const product = response.product;  // Lấy sản phẩm từ response
  
      // Kiểm tra số lượng sản phẩm trong giỏ hàng và trong kho
      if (item.quantity < product.quantity) {
        item.quantity++;
        this.cartService.updateQuantity(item.id, item.quantity);
      } else {
        alert('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    });
=======
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity); // Cập nhật số lượng trong giỏ hàng
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity); // Cập nhật số lượng trong giỏ hàng
<<<<<<< HEAD
    } 
    // else {
    //   alert('Số lượng không thể nhỏ hơn 1');
    // }
  }

  // Kiểm tra số lượng sản phẩm
  validateQuantity(item: any) {
    this.productService.getProductById(item.id).subscribe((response: any) => {
      const product = response.product;  // Lấy sản phẩm từ response
  
      if (item.quantity < 1) {
        item.quantity = 1;  // Đảm bảo số lượng không nhỏ hơn 1
      } else if (item.quantity > product.quantity) {
        item.quantity = product.quantity;  // Điều chỉnh lại số lượng nếu vượt quá kho
        alert('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
      this.cartService.updateQuantity(item.id, item.quantity);
    });
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => {
      const priceWithDiscount = item.discount > 0 ? 
                                item.price - (item.price * (item.discount / 100)) : 
                                item.price;
      return total + (priceWithDiscount * item.quantity);  // Cộng tổng tiền với discount
    }, 0);
  }
  
  // Xóa tất cả sản phẩm trong giỏ
  clearCart() {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sạch giỏ hàng?");
    if (confirmation) {
      this.cartService.clearCart();
      this.loadCart(); // Cập nhật giỏ hàng sau khi xóa tất cả sản phẩm
    }
  }
  
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }
  
=======
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
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
}
