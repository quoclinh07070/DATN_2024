import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 200 && this.isLocalStorageAvailable()) {
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.shop.user_id.toString());
          localStorage.setItem('userName', response.metadata.shop.name);
          localStorage.setItem('userEmail', response.metadata.shop.email);
        }
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng nhập';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap((response: any) => {
        if (response.status === 201 && this.isLocalStorageAvailable()) {
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id.toString());
          localStorage.setItem('userName', response.metadata.user.name);
          localStorage.setItem('userEmail', response.metadata.user.email);
        }
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng ký';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): Observable<any> {
    const clientId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!clientId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng để đăng xuất.');
    }

    const headers = {
      'x-client-id': clientId,
      'authorization': accessToken,
    };

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.clearLocalStorage();
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng xuất';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }

  isAuthenticated(): boolean {
    return this.isLocalStorageAvailable() && localStorage.getItem('accessToken') !== null;
  }

  getUserInfo(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.get(`${this.apiUrl}/user-info`, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi lấy thông tin người dùng';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  updateUserInfo(userData: { name: string; email: string; phoneNumber: string; address: string }): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.put(`${this.apiUrl}/update-user`, userData, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi cập nhật thông tin người dùng';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.put(`${this.apiUrl}/change-password`, { currentPassword, newPassword }, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi thay đổi mật khẩu';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  checkUserRole(): Observable<boolean> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      this.redirectToAccessDenied();
      return throwError(() => new Error('Người dùng chưa đăng nhập.'));
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.post(`${this.apiUrl}/admin`, {}, { headers }).pipe(
      tap((response: any) => {
        if (response.status !== 200) {
          this.redirectToAccessDenied();
        }
      }),
      catchError((error: any) => {
        this.redirectToAccessDenied();
        return throwError(() => new Error(error.error?.message || 'Lỗi xác thực quyền.'));
      }),
      tap(() => true)
    );
  }

  private redirectToAccessDenied(): void {
    window.location.href = '/admin/access-denied';
  }
}
