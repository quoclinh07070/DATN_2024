import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
  }


  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }
}
