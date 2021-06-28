import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  categories: Array<Category>;
  http: HttpClient;
  baseUrl: string;
  product: Product;
  selectedLevel;
  public message = new BehaviorSubject<string>(null);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _location: Location) { this.http = http; this.baseUrl = baseUrl; }

  ngOnInit() {
    this.categories = null;
    this.getCategories();
  }

  onSubmit(form: NgForm) {
    let Product = {
      name: form.value.name,
      category: <Category>form.value.category,
      price: form.value.price,
    }

    this.addProduct(Product, form);
  }

  async addProduct(productInput, form) {
    console.log(productInput);
    this.http.post<Product>(this.baseUrl + 'api/products', productInput).subscribe(result => {
      this.product = result;
      this.message.next('Poduct "' + this.product.name + '" was added successfully.');
      form.reset();
    }, error => this.message.next(error.error));
  }

  async getCategories() {
    this.http.get<Array<Category>>(this.baseUrl + 'api/categories').subscribe(result => {
      this.categories = result;
      this.selectedLevel = this.categories[this.product.category.id];
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
  user: string;
}

interface Category {
  id: number;
  name: string;
}
