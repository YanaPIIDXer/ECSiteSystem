import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product | null
  count: number

  constructor() {
    this.count = 0;
    this.product = null;
  }

  ngOnInit(): void {
  }

  async add(): Promise<void> {

  }

}
