import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

<<<<<<< HEAD
=======

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
=======

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 200 && this.isLocalStorageAvailable()) {
<<<<<<< HEAD
=======
          // Lưu access token và refresh token vào localStorage
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.shop.user_id.toString());
          localStorage.setItem('userName', response.metadata.shop.name);
          localStorage.setItem('userEmail', response.metadata.shop.email);
        }
      }),
      catchError((error: any) => {
<<<<<<< HEAD
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng nhập';
=======
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap((response: any) => {
        if (response.status === 201 && this.isLocalStorageAvailable()) {
<<<<<<< HEAD
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id.toString());
=======
          // Lưu access token và refresh token vào localStorage
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id);
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
          localStorage.setItem('userName', response.metadata.user.name);
          localStorage.setItem('userEmail', response.metadata.user.email);
        }
      }),
      catchError((error: any) => {
<<<<<<< HEAD
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng ký';
=======
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): Observable<any> {
<<<<<<< HEAD
=======
    if (!this.isLocalStorageAvailable()) {
      throw new Error('localStorage không được hỗ trợ trong môi trường này.');
    }

>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
    const clientId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!clientId || !accessToken) {
<<<<<<< HEAD
      throw new Error('Không tìm thấy thông tin người dùng để đăng xuất.');
=======
      throw new Error('Không thể đăng xuất, không tìm thấy thông tin người dùng.');
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
    }

    const headers = {
      'x-client-id': clientId,
      'authorization': accessToken,
    };

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
<<<<<<< HEAD
        this.clearLocalStorage();
=======
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng xuất';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

<<<<<<< HEAD
  private clearLocalStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }

=======
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
  isAuthenticated(): boolean {
    return this.isLocalStorageAvailable() && localStorage.getItem('accessToken') !== null;
  }

<<<<<<< HEAD
=======
  // Thêm phương thức lấy thông tin người dùng
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
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

<<<<<<< HEAD
  updateUserInfo(userData: { name: string; email: string; phoneNumber: string; address: string }): Observable<any> {
=======
  // Thêm phương thức cập nhật thông tin người dùng
  updateUserInfo(fullname: string, email: string, phoneNumber: string): Observable<any> {
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

<<<<<<< HEAD
    return this.http.put(`${this.apiUrl}/update-user`, userData, { headers }).pipe(
=======
    return this.http.put(`${this.apiUrl}/update-user`, { fullname, email, phoneNumber }, { headers }).pipe(
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi cập nhật thông tin người dùng';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

<<<<<<< HEAD
=======
  updateAvatar(formData: FormData): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.post(`${this.apiUrl}/update-avatar`, formData, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi cập nhật avatar';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Thêm phương thức thay đổi mật khẩu
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
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
<<<<<<< HEAD

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
=======
// AuthService
checkUserRole(): Observable<boolean> {
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  if (!userId || !accessToken) {
    this.redirectToLogin();
    return throwError(() => new Error('Người dùng chưa đăng nhập.'));
  }

  const headers = {
    'x-client-id': userId,
    'authorization': accessToken,
  };

  return this.http.post(`${this.apiUrl}/admin`, {}, { headers }).pipe(
    tap((response: any) => {
      if (response.status !== 200) {
        this.redirectToLogin();
      }
    }),
    catchError((error: any) => {
      this.redirectToLogin();
      return throwError(() => new Error(error.error?.message || 'Lỗi xác thực quyền.'));
    }),
    tap(() => true)
  );
}

private redirectToLogin(): void {
  // Xóa token và điều hướng về trang đăng nhập
  // localStorage.removeItem('accessToken');
  // localStorage.removeItem('refreshToken');
  // localStorage.removeItem('userId');
  // localStorage.removeItem('userName');
  // localStorage.removeItem('userEmail');
  window.location.href = '/admin/login';
}

  
>>>>>>> e7112c69fb196476b9c27f5fa08bc1e129599513
}
