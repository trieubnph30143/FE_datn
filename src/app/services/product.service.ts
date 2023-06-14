import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = `http://localhost:3000/products`;

  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}`)
  }
  getOneProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`)
  }
  removeProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`)
  }
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, product)
  }
  updateProduct(product: any): Observable<any> {
    console.log({ product })
    return this.http.put<any>(`${this.API_URL}/${product.id}`, product)
  }
}
