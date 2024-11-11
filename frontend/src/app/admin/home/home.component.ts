import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
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
}