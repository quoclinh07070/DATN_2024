import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';  // Import CartService
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   // Import FormsModule
import { VoucherService } from '../../services/voucher.service';  // Import VoucherService

import { NotyfService } from '../../services/notyf.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  voucherCode: string = '';  // Mã voucher nhập từ người dùng
  appliedVoucher: any = null; // Voucher đã áp dụng

  constructor(private cartService: CartService, private productService: ProductService,    
    private voucherService: VoucherService  // Inject VoucherService
  , private notyfService: NotyfService) {}

  ngOnInit(): void {
    this.loadCart();
    // Kiểm tra xem có voucher đã được lưu trong localStorage không
  const savedVoucher = localStorage.getItem('appliedVoucher');
  if (savedVoucher) {
    this.appliedVoucher = JSON.parse(savedVoucher);  // Khôi phục voucher từ localStorage
  }
  }

  // Tải giỏ hàng từ CartService
  loadCart() {
    this.cartItems = this.cartService.getCartItems();  // Lấy danh sách sản phẩm trong giỏ hàng từ CartService
  
    // Kiểm tra nếu giỏ hàng trống
    if (this.cartItems.length === 0) {
      // Xóa voucher khỏi localStorage nếu giỏ hàng trống
      localStorage.removeItem('appliedVoucher');  
      
      // Hủy voucher đã áp dụng trong component
      this.appliedVoucher = null;  
    }else {
      // Kiểm tra nếu có voucher đã áp dụng trong component và kiểm tra tổng đơn hàng
      const total = this.getTotalWithoutVoucher();
      if (this.appliedVoucher) {
        const voucher = this.appliedVoucher;
        const minAmount = parseFloat(voucher.price);
  
        // Nếu tổng giỏ hàng nhỏ hơn mức tối thiểu của voucher, xóa voucher
        if (total < minAmount) {          
          // Xóa voucher khỏi localStorage và trong component
          localStorage.removeItem('appliedVoucher');
          this.appliedVoucher = null;
        }
      }
    }
    this.cartItems = this.cartService.getCartItems();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {

    this.cartService.removeFromCart(productId);
    this.loadCart(); // Cập nhật giỏ hàng sau khi xóa sản phẩm
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(item: any) {
    this.productService.getProductById(item.id).subscribe((response: any) => {
      const product = response.product;  // Lấy sản phẩm từ response
  
      // Kiểm tra số lượng sản phẩm trong giỏ hàng và trong kho
      if (item.quantity < product.quantity) {
        item.quantity++;
        this.cartService.updateQuantity(item.id, item.quantity);
        this.loadCart();  // Kiểm tra lại voucher sau khi thay đổi số lượng
      } else {
        this.notyfService.error('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    });
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity); // Cập nhật số lượng trong giỏ hàng
      this.loadCart();  // Kiểm tra lại voucher sau khi thay đổi số lượng
    } 
  }

  // Kiểm tra số lượng sản phẩm
  validateQuantity(item: any) {
    this.productService.getProductById(item.id).subscribe((response: any) => {
      const product = response.product;  // Lấy sản phẩm từ response
  
      if (item.quantity < 1) {
        item.quantity = 1;  // Đảm bảo số lượng không nhỏ hơn 1
      } else if (item.quantity > product.quantity) {
        item.quantity = product.quantity;  // Điều chỉnh lại số lượng nếu vượt quá kho
        this.notyfService.error('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
      this.cartService.updateQuantity(item.id, item.quantity);
    });
  }

  // Tính tổng tiền không có voucher
  getTotalWithoutVoucher() {
    return this.cartItems.reduce((total, item) => {
      const priceWithDiscount = item.discount > 0 ? 
                                item.price - (item.price * (item.discount / 100)) : 
                                item.price;
      return total + (priceWithDiscount * item.quantity);  // Tổng tiền không có voucher
    }, 0);
  }

  // Tính tổng tiền có voucher (nếu có voucher)
  getTotal() {
    const total = this.getTotalWithoutVoucher();  // Lấy tổng tiền chưa giảm giá
    
    // Nếu có voucher đã áp dụng, tính giảm giá
    if (this.appliedVoucher) {
      const discount = (this.appliedVoucher.discount_percent / 100) * total;  // Tính giảm giá
      return total - discount;  // Trừ đi giảm giá từ tổng tiền
    }
    
    return total;  // Nếu không có voucher, trả về tổng tiền ban đầu
  }

  
  
  // Xóa tất cả sản phẩm trong giỏ
  clearCart() {
    Swal.fire({
      title: 'Bạn có chắc chắn xóa hết giỏ hàng không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning', // Các giá trị khác: success, error, info, question
      showCancelButton: true, // Hiển thị nút "Cancel"
      confirmButtonColor: '#3085d6', // Màu nút xác nhận
      cancelButtonColor: '#d33', // Màu nút hủy
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Xong!', 'Xóa giỏ hàng thành công!', 'success');
        this.cartService.clearCart();
        this.loadCart(); // Cập nhật giỏ hàng sau khi xóa tất cả sản phẩm
      }
    });
    
  }
  
  
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }
  // Áp dụng mã voucher vào giỏ hàng
  applyVoucher() {
    if (!this.voucherCode) {
      alert('Vui lòng nhập mã voucher!');
      return;
    }
  
    this.voucherService.getAllVouchers().subscribe((response: any) => {
      const vouchers = response.vouchers;  // Lấy danh sách voucher từ thuộc tính 'vouchers'
  
      if (Array.isArray(vouchers)) {
        const voucher = vouchers.find((v: any) => v.voucher_code === this.voucherCode);
  
        if (!voucher) {
          alert('Mã voucher không hợp lệ!');
          return;
        }
        
        const quantityVoucher = voucher.quantity >= 1;
        if(!quantityVoucher){
          alert('Voucher đã hết số lượng sử dụng!');
          return;
        }
        // Kiểm tra ngày và trạng thái voucher
        const currentDate = new Date();
        const validFrom = new Date(voucher.valid_from);
        const validTo = new Date(voucher.valid_to);
        const isValid = currentDate >= validFrom && currentDate <= validTo && voucher.status === 'active';
  
        if (!isValid) {
          alert('Voucher không hợp lệ hoặc đã hết hạn!');
          return;
        }
  
        // Kiểm tra giá trị tối thiểu của đơn hàng dựa trên tổng tiền chưa có giảm giá
        const total = this.getTotalWithoutVoucher();  // Sử dụng tổng chưa giảm giá để kiểm tra điều kiện
        if (total < parseFloat(voucher.price)) {
          alert('Giá trị đơn hàng chưa đủ để áp dụng voucher!');
          // Xóa voucher khỏi localStorage và trong component nếu không đủ điều kiện
          localStorage.removeItem('appliedVoucher');
          this.appliedVoucher = null;
          return;
        }
  
        // Áp dụng voucher vào giỏ hàng
        this.appliedVoucher = voucher;  // Lưu voucher đã áp dụng
        localStorage.setItem('appliedVoucher', JSON.stringify(voucher));  // Lưu voucher vào localStorage
        alert('Voucher áp dụng thành công!');
      } else {
        alert('Dữ liệu voucher không hợp lệ!');
      }
    });
  }
  
  
  removeVoucher() {
    if(this.appliedVoucher != null){
      alert('Voucher đã bị xóa!');//nếu hiện có voucher mới hiện thông báo
    }
    localStorage.removeItem('appliedVoucher');
    this.appliedVoucher = null;  // Xóa voucher đã áp dụng
  }
  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
    }
    return value;
  }
  
}
