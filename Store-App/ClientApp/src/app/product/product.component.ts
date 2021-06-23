import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductDataComponent {
  public products: Product[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Product[]>(baseUrl + 'api/products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  onDelete(id: number) {
    this.http.delete<Product[]>(this.baseUrl + 'api/products/' + id).subscribe(result => {
      let room = this.products.find(x => x.id === id);
      let index = this.products.indexOf(room, 0);
      this.products.splice(index, 1);
    }, error => console.error(error));
  }
}

interface Product {
  id: number;
  name: string;
  category: number;
  price: number;
}
