import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductDataComponent {
  public products: Product[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>(baseUrl + 'api/products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }
}

interface Product {
  id: number;
  name: string;
  category: number;
  price: number;
}
