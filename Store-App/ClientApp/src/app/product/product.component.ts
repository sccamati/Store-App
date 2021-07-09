import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductDataComponent implements OnInit {
  public products: Product[];
  public user2: User2;
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private authorizeService: AuthorizeService) {}

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));

    this.http.get<Product[]>(this.baseUrl + 'api/products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
    this.http.get<User2>(this.baseUrl + 'api/user').subscribe(result => {
      this.user2 = result;
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
interface User2 {
  id: string;
  role: string;
}
interface Category {
  id: number;
  name: string;
}

