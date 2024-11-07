import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule], // Thêm CommonModule vào đây
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Sửa từ styleUrl thành styleUrls
})
export class HomeComponent {
  
}
