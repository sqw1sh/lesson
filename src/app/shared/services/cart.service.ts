import { Injectable } from '@angular/core';
import ProductType from 'src/app/types/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public product: ProductType;

  constructor() {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    };
  }
}
