import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service'; // Import service
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private productService: ProductService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }

  addProduct(): void {
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
        alert('Lỗi khi thêm sản phẩm!');
      }
    );
  }
}