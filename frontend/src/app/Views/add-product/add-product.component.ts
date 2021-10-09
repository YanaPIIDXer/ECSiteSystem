import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  name: string
  price: number
  imageUrl: string
  description: string

  constructor() {
    this.name = "";
    this.price = 0;
    this.imageUrl = "";
    this.description = "";
  }

  ngOnInit(): void {
  }

}
