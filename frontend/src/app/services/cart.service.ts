import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { 
    this.loadCartFromLocalStorage();
  }

  // Lấy các sản phẩm trong giỏ hàng
  getCartItems() {
    return this.cartItems;
  }

  // Thông báo về sự thay đổi của giỏ hàng
  private updateCartItems() {
    this.cartItemsSubject.next([...this.cartItems]); // Sử dụng spread operator để tạo mảng mới
  }

  // Lưu giỏ hàng vào LocalStorage
  public saveCartToLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    this.updateCartItems(); // Thông báo về sự thay đổi sau khi lưu giỏ hàng
  }

  // Tải giỏ hàng từ LocalStorage
  private loadCartFromLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.cartItems = JSON.parse(cart);
        this.updateCartItems(); // Thông báo về sự thay đổi khi tải giỏ hàng
      }
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({...product, quantity: 1});
    }
    this.saveCartToLocalStorage();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToLocalStorage();
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  clearCart() {
    this.cartItems = [];
    this.saveCartToLocalStorage();
  }

  // Tính tổng tiền trong giỏ hàng
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Cập nhật số lượng của sản phẩm trong giỏ hàng
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCartToLocalStorage();
    }
  }

  // Kiểm tra xem localStorage có sẵn không
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
