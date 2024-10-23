// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {
//   private apiUrl = 'http://localhost:3000/api/categories';

//   constructor(private http: HttpClient) { }

//   createCategory(category: any): Observable<any> {
//     return this.http.post(this.apiUrl, category);
//   }

//   updateCategory(id: number, category: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, category);
//   }

//   deleteCategory(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }
