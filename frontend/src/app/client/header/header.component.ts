import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchValue: string = '';

  constructor(private router: Router) {}

  // Hàm xử lý tìm kiếm khi người dùng submit form
  onSearchSubmit(event: Event) {
    event.preventDefault();  // Ngăn chặn form tự động reload trang
    if (this.searchValue.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchValue } });  // Điều hướng tới trang kết quả tìm kiếm
    }
  }
}
