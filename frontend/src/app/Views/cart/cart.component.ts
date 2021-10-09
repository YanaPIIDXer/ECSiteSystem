import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/Models/cart-product';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  list: CartProduct[]
  totalPrice: number

  constructor() {
    this.list = [];
    this.totalPrice = 0;
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/user/cart");
    if (res.status != 200) { return; }
    this.list = res.json.products;
    this.totalPrice = 0;
    for (let item of this.list) {
      this.totalPrice += item.price * item.count;
    }
  }

}
