<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
=======
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

@Component({
  selector: 'app-checkout',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // Thuộc tính địa chỉ
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedProvince: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';

  // Thuộc tính thanh toán
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  selectedPaymentMethod: string = '';
  note: string = ''; // Thêm thuộc tính `note`

  constructor(private http: HttpClient, private checkoutService: CheckoutService, private router: Router) {}

  ngOnInit() {
    // Load danh sách Tỉnh/Thành phố
    this.http.get('https://provinces.open-api.vn/api/p/').subscribe((data: any) => {
      this.provinces = data;
    });
  }

  // Xử lý khi chọn Tỉnh/Thành phố
  onProvinceChange() {
    if (this.selectedProvince) {
      this.http.get(`https://provinces.open-api.vn/api/p/${this.selectedProvince}?depth=2`)
        .subscribe((data: any) => {
          this.districts = data.districts;
          this.wards = []; // Reset Quận/Huyện
          this.selectedDistrict = ''; // Reset district selection
          this.selectedWard = ''; // Reset ward selection
        });
    }
  }

  // Xử lý khi chọn Quận/Huyện
  onDistrictChange() {
    if (this.selectedDistrict) {
      this.http.get(`https://provinces.open-api.vn/api/d/${this.selectedDistrict}?depth=2`)
        .subscribe((data: any) => {
          this.wards = data.wards;
          this.selectedWard = ''; // Reset ward selection
        });
    }
  }


  
=======
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
}
