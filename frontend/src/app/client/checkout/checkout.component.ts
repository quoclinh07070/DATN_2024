import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PaymentService, PaymentResponse } from '../../services/payment.service'; // Import PaymentService
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
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

  paymentMethod: string = 'cod'; // Mặc định là thanh toán cod

  // Biến lỗi để kiểm tra địa chỉ
  addressError: string = '';
  errors = {
    address: '',
    tinh: '',
    quan: '',
    phuong: '',
    phone: '',
  };

  user: any = {
    id: '', // ID người dùng
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  }; // Thông tin người dùng

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private http: HttpClient, // Inject HttpClient
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = {
          id: data.user.id,
          name: data.user.fullname,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber || '',
          address: data.user.address || '',
        };
        console.log('Địa chỉ từ backend:', this.user.address);

        // Phân tách địa chỉ thành các phần
        const addressParts = this.user.address
          .split(',')
          .map((part: string) => part.trim());
        this.user.address = addressParts[0] || ''; // Địa chỉ chi tiết (số nhà, tên đường)
        this.selectedPhuong = addressParts[1] || '';
        this.selectedQuan = addressParts[2] || '';
        this.selectedTinh = addressParts[3] || '';

        // Tải dữ liệu cho dropdown
        this.loadTinhThanh();
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        this.router.navigate(['/login']);
      },
    });

    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = Math.round(this.getTotal());
  }

  getTotal() {
    // Tính tổng giỏ hàng với giảm giá (nếu có)
    return this.cartItems.reduce((total, item) => {
      const priceWithDiscount =
        item.discount > 0
          ? item.price - item.price * (item.discount / 100)
          : item.price;
      return total + priceWithDiscount * item.quantity; // Cộng tổng tiền với discount
    }, 0);
  }

  // Kiểm tra địa chỉ trước khi xử lý thanh toán
  validateAddress(): boolean {
    let isValid = true;
    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/; // Chỉ cho phép số điện thoại 10-11 chữ số
    if (!this.user.phoneNumber || !phoneRegex.test(this.user.phoneNumber)) {
      this.errors.phone =
        'Số điện thoại không hợp lệ. Vui lòng nhập đúng số điện thoại.';
      isValid = false;
    } else {
      this.errors.phone = ''; // Xóa lỗi nếu hợp lệ
    }
    // Kiểm tra địa chỉ chi tiết
    if (!this.user.address || this.user.address.trim() === '') {
      this.errors.address = 'Vui lòng nhập địa chỉ chi tiết.';
      isValid = false;
    } else {
      this.errors.address = ''; // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra Tỉnh
    if (!this.selectedTinh) {
      this.errors.tinh = 'Vui lòng chọn Tỉnh/Thành phố.';
      isValid = false;
    } else {
      this.errors.tinh = ''; // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra Quận
    if (!this.selectedQuan) {
      this.errors.quan = 'Vui lòng chọn Quận/Huyện.';
      isValid = false;
    } else {
      this.errors.quan = ''; // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra Phường
    if (!this.selectedPhuong) {
      this.errors.phuong = 'Vui lòng chọn Phường/Xã.';
      isValid = false;
    } else {
      this.errors.phuong = ''; // Xóa lỗi nếu hợp lệ
    }

    return isValid;
  }

  // Lấy danh sách Tỉnh Thành từ API
  loadTinhThanh() {
    this.http
      .get<any>('https://esgoo.net/api-tinhthanh/1/0.htm')
      .subscribe((data) => {
        if (data.error === 0) {
          this.tinhThanh = data.data;

          // Tìm ID của Tỉnh dựa trên tên
          const tinhObj = this.tinhThanh.find(
            (tinh) => tinh.full_name === this.selectedTinh
          );
          if (tinhObj) {
            this.selectedTinh = tinhObj.id;
            this.loadQuanHuyen(); // Tự động tải Quận/Huyện
          }
        }
      });
  }

  loadQuanHuyen() {
    if (this.selectedTinh) {
      this.http
        .get<any>(`https://esgoo.net/api-tinhthanh/2/${this.selectedTinh}.htm`)
        .subscribe((data) => {
          if (data.error === 0) {
            this.quanHuyen = data.data;

            // Tìm ID của Quận/Huyện dựa trên tên
            const quanObj = this.quanHuyen.find(
              (quan) => quan.full_name === this.selectedQuan
            );
            if (quanObj) {
              this.selectedQuan = quanObj.id;
              this.loadPhuongXa(); // Tự động tải Phường/Xã
            }
          }
        });
    }
  }

  loadPhuongXa() {
    if (this.selectedQuan) {
      this.http
        .get<any>(`https://esgoo.net/api-tinhthanh/3/${this.selectedQuan}.htm`)
        .subscribe((data) => {
          if (data.error === 0) {
            this.phuongXa = data.data;

            // Tìm ID của Phường/Xã dựa trên tên
            const phuongObj = this.phuongXa.find(
              (phuong) => phuong.full_name === this.selectedPhuong
            );
            if (phuongObj) {
              this.selectedPhuong = phuongObj.id;
            }
          }
        });
    }
  }

  // Phương thức thanh toán
  onCheckout(): void {
    if (!this.validateAddress()) {
      return; // Ngăn không cho tiếp tục nếu địa chỉ không hợp lệ
    }
    //   if (this.totalAmount < 1000) {
    //     alert('Bạn chưa có sản phẩm nào dể thanh toán!');
    //     return;
    // }
    const orderId = this.generateOrderId();
    const orderInfo = `Thanh toán cho đơn hàng ${orderId}`;

    const selectedTinhName =
      this.tinhThanh.find((tinh) => tinh.id === this.selectedTinh)?.full_name ||
      '';
    const selectedQuanName =
      this.quanHuyen.find((quan) => quan.id === this.selectedQuan)?.full_name ||
      '';
    const selectedPhuongName =
      this.phuongXa.find((phuong) => phuong.id === this.selectedPhuong)
        ?.full_name || '';

    const fullAddress = `${this.user.address}, ${selectedPhuongName}, ${selectedQuanName}, ${selectedTinhName}`;
    
    const extraData = {
      userId: this.user.id,
      address: fullAddress,
      phoneNumber: this.user.phoneNumber,
    };

    if (this.paymentMethod === 'momo') {
      console.log(extraData)

      this.paymentService.createPayment(this.totalAmount, orderId, orderInfo, extraData).subscribe(
        (response: PaymentResponse) => {
          if (response && response.payUrl) {
            this.cartService.clearCart(); // Xóa giỏ hàng trước khi chuyển hướng
            window.location.href = response.payUrl;
          } else {
            alert('Không nhận được URL thanh toán. Vui lòng thử lại.');
          }
        },
        (error) => {
          console.error('Lỗi thanh toán:', error);
        }
      );
    } else if (this.paymentMethod === 'cod') {
      // Xử lý thanh toán khi nhận hàng
      const orderData = {
        user: this.user,
        cartItems: this.cartItems,
        totalAmount: this.totalAmount,
        orderId: orderId,
        shippingAddress: {
          address: fullAddress,
          province: selectedTinhName,
          district: selectedQuanName,
          ward: selectedPhuongName,
        },
      };

      this.paymentService.submitCODOrder(orderData).subscribe({
        next: (response) => {
          alert(
            'Đơn hàng của bạn đã được tạo thành công. Đơn vị vận chuyển sẽ liên hệ với bạn sớm!'
          );
          this.cartService.clearCart();
          this.router.navigate(['/success-page'], {
            queryParams: { orderId: orderId },
          });
        },
        error: (err) => {
          console.error('Lỗi khi tạo đơn hàng COD:', err);
          alert('Tạo đơn hàng COD thất bại. Vui lòng thử lại!');
        },
      });
    }
  }

  createCODOrder(orderId: string): void {
    const orderData = {
      user: this.user,
      cartItems: this.cartItems,
      totalAmount: this.totalAmount,
      orderId: orderId,
      paymentMethod: 'cod',
      shippingAddress: {
        address: this.user.address,
        province: this.selectedTinh,
        district: this.selectedQuan,
        ward: this.selectedPhuong,
      },
    };

    // Gửi dữ liệu đến backend
    this.paymentService.submitCODOrder(orderData).subscribe({
      next: (response) => {
        alert(
          'Đơn hàng của bạn đã được tạo thành công. Đơn vị vận chuyển sẽ liên hệ với bạn sớm!'
        );
        this.cartService.clearCart(); // Xóa giỏ hàng
        this.router.navigate(['/success-page']); // Điều hướng đến trang thành công
      },
      error: (err) => {
        console.error('Lỗi khi tạo đơn hàng COD:', err);
        alert('Tạo đơn hàng COD thất bại. Vui lòng thử lại!');
      },
    });
  }

  // Phương thức tạo mã đơn hàng
  generateOrderId(): string {
    return 'ORD-' + new Date().getTime(); // Tạo mã đơn hàng đơn giản bằng timestamp
  }
}
