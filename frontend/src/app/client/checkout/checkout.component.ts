import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';  // Import CartService
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { FormsModule } from '@angular/forms';   // Import FormsModule
import { PaymentService } from '../../services/payment.service';  // Import PaymentService

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  tinhThanh: any[] = [];
  quanHuyen: any[] = [];
  phuongXa: any[] = [];
  selectedTinh: string = '';
  selectedQuan: string = '';
  selectedPhuong: string = '';
  totalAmount: number = 0;

  constructor(
  private cartService: CartService,
  private paymentService: PaymentService,
  private http: HttpClient  // Inject HttpClient
  ) {}

  ngOnInit(): void {
    // Lấy giỏ hàng khi component được khởi tạo
    this.cartItems = this.cartService.getCartItems();
    this.loadTinhThanh();  // Load Tỉnh Thành khi component khởi tạo
    this.totalAmount = Math.round(this.getTotal());  // Gọi getTotal() để tính toán lại tổng có giảm giá
  }

  getTotal() {
    // Tính tổng giỏ hàng với giảm giá (nếu có)
    return this.cartItems.reduce((total, item) => {
      const priceWithDiscount = item.discount > 0 ? 
                                item.price - (item.price * (item.discount / 100)) : 
                                item.price;
      return total + (priceWithDiscount * item.quantity);  // Cộng tổng tiền với discount
    }, 0);
  }

    // Lấy danh sách Tỉnh Thành từ API
    loadTinhThanh() {
      this.http.get<any>('https://esgoo.net/api-tinhthanh/1/0.htm').subscribe((data) => {
        if (data.error === 0) {
          this.tinhThanh = data.data;  // Gán dữ liệu Tỉnh Thành vào biến
        }
      });
    }
  
    // Lấy danh sách Quận Huyện theo Tỉnh Thành
    loadQuanHuyen() {
      if (this.selectedTinh) {
        this.http.get<any>(`https://esgoo.net/api-tinhthanh/2/${this.selectedTinh}.htm`).subscribe((data) => {
          if (data.error === 0) {
            this.quanHuyen = data.data;  // Gán dữ liệu Quận Huyện vào biến
            this.phuongXa = [];  // Xóa Phường Xã khi thay đổi Quận Huyện
            this.selectedQuan = '';  // Reset Quận Huyện đã chọn
          }
        });
      }
    }
  
    // Lấy danh sách Phường Xã theo Quận Huyện
    loadPhuongXa() {
      if (this.selectedQuan) {
        this.http.get<any>(`https://esgoo.net/api-tinhthanh/3/${this.selectedQuan}.htm`).subscribe((data) => {
          if (data.error === 0) {
            this.phuongXa = data.data;  // Gán dữ liệu Phường Xã vào biến
          }
        });
      }
    }

    // Phương thức thanh toán
    onCheckout(): void {

      const orderId = this.generateOrderId();
      const orderInfo = `Thanh toán cho đơn hàng ${orderId}`;

      // Gọi API thanh toán
      this.paymentService.createPayment(this.totalAmount, orderId, orderInfo).subscribe(
        (response) => {
          // Chuyển hướng tới trang thanh toán nếu có URL
          if (response && response.payUrl) {
            // Xóa giỏ hàng trước khi tiến hành thanh toán
            this.cartService.clearCart();
            window.location.href = response.payUrl;
          }else{
            alert('Chuyển hướng đến trang thanh toán thất bại!');
            console.log('Chuyển hướng đến trang thanh toán thất bại!');
          }
        },
        (error) => {
          console.error('Lỗi thanh toán:', error);
          // Kiểm tra lỗi trả về từ API (ví dụ: mã lỗi 400)
          if (error.status === 400 && error.error && error.error.message) {
            // Nếu lỗi là 400 và có thông báo, hiển thị thông báo lỗi cho người dùng
              alert('Số tiền thanh toán trên MoMo không được vượt quá 50.000.000đ/ngày!');
          } else {
            alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.');
          }

        }
      );
    }

    // Phương thức tạo mã đơn hàng
    generateOrderId(): string {
      return 'ORD-' + new Date().getTime();  // Tạo mã đơn hàng đơn giản bằng timestamp
    }    

}
