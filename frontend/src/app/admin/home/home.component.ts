<<<<<<< HEAD
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
=======
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
<<<<<<< HEAD
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}  // Inject AuthService and Router

  ngOnInit(): void {
    this.authService.checkUserRole().subscribe(
      (isAuthorized: boolean) => {
        if (!isAuthorized) {
          this.router.navigate(['/admin/login']);
        }
      },
      (error) => {
        console.error('Lỗi kiểm tra quyền:', error);
        this.router.navigate(['/login']);
      }
    );
  }
=======
export class HomeComponent {
  // Your component logic
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
}