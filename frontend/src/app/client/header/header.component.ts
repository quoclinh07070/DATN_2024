import { Component,OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CartService } from '../../services/cart.service';  // Import CartService
import { CommonModule } from '@angular/common';
declare var webkitSpeechRecognition: any;
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
  recognition: any;
  isSpeechRecognitionSupported: boolean = false;

  constructor(private router: Router, private cartService: CartService) {
    // Kiểm tra xem trình duyệt có hỗ trợ webkitSpeechRecognition hay không
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'vi-VN'; // Đặt ngôn ngữ tiếng Việt
      this.isSpeechRecognitionSupported = true;

      this.recognition.onresult = (event: any) => {
        this.searchValue = event.results[0][0].transcript;
        alert(this.searchValue);
        this.onSearchSubmit(new Event('submit'));
      };
    } else {
      // Thông báo nếu trình duyệt không hỗ trợ Web Speech API
      // console.log('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.');
    }
  }

  ngOnInit(): void {
    this.loadCart();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    if (this.searchValue.trim()) {
      // Điều hướng với router.navigate() và reload trang
      this.router.navigate(['/search'], { queryParams: { query: this.searchValue } }).then(() => {
        // Sau khi điều hướng, reload lại trang
        window.location.reload(); // Reload trang
      });
    }
  }

  startVoiceSearch() {
    if (this.isSpeechRecognitionSupported) {
      this.recognition.start();
    } else {
      alert('Chức năng nhận diện giọng nói không khả dụng trên trình duyệt của bạn.');
    }
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }
}
