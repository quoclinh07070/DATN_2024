import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GHN
  getGHNFee(orderInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ghn/fee`, orderInfo);
  }

  createGHNOrder(orderDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ghn/create`, orderDetails);
  }

  // GHTK
  getGHTKFee(orderInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ghtk/fee`, orderInfo);
  }

  createGHTKOrder(orderDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ghtk/create`, orderDetails);
  }
}
