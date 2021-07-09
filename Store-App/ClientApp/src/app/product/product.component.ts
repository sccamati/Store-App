import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductDataComponent implements OnInit {
  public products: Product[];
  public userId: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  ngOnInit() {
    this.http.get<Product[]>(this.baseUrl + 'api/products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
    this.http.get(this.baseUrl + 'api/user', {responseType: 'text'}).subscribe(result => {
      this.userId = result;
    }, error => console.error(error));
  }

  onDelete(id: number) {
    this.http.delete<Product[]>(this.baseUrl + 'api/products/' + id).subscribe(result => {
      let product = this.products.find(x => x.id === id);
      let index = this.products.indexOf(product, 0);
      this.products.splice(index, 1);
    }, error => console.error(error));
  }
}


interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  user: User;
}

interface User {
  id: string;
}

interface Category {
  id: number;
  name: string;
}

