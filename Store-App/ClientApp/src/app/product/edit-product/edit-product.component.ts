import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public message = new BehaviorSubject<string>(null);
  product: Product;
  id: number;
  categories: Array<Category>;
  selectedLevel;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private _location: Location) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.product = {
      id: null,
      name: null,
      category: null,
      price: null,
    }
    this.fetchUser();
    this.categories = null;
    this.getCategories();
  }

  onSubmit(form: NgForm) {
    let product = {
      id: this.id,
      name: form.value.name,
      category: form.value.category,
      price: form.value.price,
    }
    this.editProduct(product);
  }

  async editProduct(productInput) {
    this.http.put<Product>(this.baseUrl + 'api/products', productInput).subscribe(result => {
      this.product = result;
      this.message.next('Product "' + this.product.id + '" was edited successfully.');
    }, error => this.message.next(error.error));
    
  }

  async fetchUser() {
    this.http.get<Product>(this.baseUrl + 'api/products/' + this.id).subscribe(result => {
      this.product = result;
      this.selectedLevel = this.categories.find(c => c.id == this.product.category.id);
    }, error => console.error(error));
  }

  async getCategories() {
    this.http.get<Array<Category>>(this.baseUrl + 'api/categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  back() {
    this._location.back();
  }

}

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
}

interface Category {
  id: number;
  name: string;
}
