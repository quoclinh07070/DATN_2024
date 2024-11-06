import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service'; // Import service
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule,  CommonModule],

  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent {
  product: any = {
    name: '',
    price: 0,
    image: null,
    description: '',
    discount: 0,
    quantity: 0,
    status: 'active',
    categories_id: ''
  };

  fileError: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileError = false; // Reset error

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.product.image = file;
      } else {
        this.fileError = true;
      }
    }
  }

  addProduct(): void {
    if (this.fileError) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('image', this.product.image);
    formData.append('description', this.product.description);
    formData.append('discount', this.product.discount.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('status', this.product.status);
    formData.append('categories_id', this.product.categories_id);

    this.productService.createProduct(formData).subscribe(
      (response) => {
        alert('Sản phẩm đã được thêm!');
        this.router.navigate(['/admin/product']);
      },
      (error) => {
        alert('Lỗi khi thêm sản phẩm! Vui lòng kiểm tra lại thông tin.');
      }
    );
  }
}
