import { Component, Input, OnInit } from '@angular/core';
import ProductType from 'src/app/types/product.type';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input() product: ProductType;

  constructor() {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    };
  }

  ngOnInit(): void {}
}
