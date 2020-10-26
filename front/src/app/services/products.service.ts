import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://publimagen.herokuapp.com/api';
  // private apiURL = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    const path = `${this.apiURL}/products`;
    return this.http.get<Product[]>(path);
  }

  getProduct(id: string) {
    const path = `${this.apiURL}/products/${id}`;
    return this.http.get<Product>(path);
  }

  createProduct(product: Product) {
    const path = `${this.apiURL}/add`;
    return this.http.post(path, product);
  }

  updateProduct(product: Product) {
    const path = `${this.apiURL}/update/${product._id}`;
    return this.http.put(path, product);
  }

  deleteProduct(id: string) {
    const path = `${this.apiURL}/delete/${id}`;
    return this.http.delete(path);
  }

  uploadImage(name: string, file: File) {
    const path = `${this.apiURL}/upload`;
    const form = new FormData();
    form.append('name', name);
    form.append('file', file, 'form-data');
    return this.http.post<Object>(path, form);
  }
}
