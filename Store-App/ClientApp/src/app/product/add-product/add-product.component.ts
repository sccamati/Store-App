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
  product: Product;
  http: HttpClient;
  baseUrl: string;
  public message = new BehaviorSubject<string>(null);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _location: Location) { this.http = http; this.baseUrl = baseUrl; }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let product = {
      id: "",
      name: form.value.number,
      category: form.value.numberOfSeats,
      price: form.value.price,
    }

    this.addProduct(product, form);
  }

  async addProduct(productInput, form) {
    console.log(productInput);
    this.http.post<Product>(this.baseUrl + 'api/product', productInput).subscribe(result => {
      this.product = result;
      this.message.next('Room "' + this.product.name + '" was added successfully.');
      form.reset();
    }, error => this.message.next(error.error));
  }

  back() {
    this._location.back();
  }
}

interface Product {
  id: number;
  name: string;
  category: number;
  price: number;
}
