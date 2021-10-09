import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
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

  async buy(): Promise<void> {
    if (this.totalPrice == 0) { return; }
    if (!confirm("購入しますか？")) { return; }

    const res = await conn.post("/user/cart/buy", new URLSearchParams());
    if (res.status != 200 || !res.json.result) {
      alert("購入に失敗しました");
      return;
    }
    alert("購入しました");
    this.router.navigate(["/"]);
  }

}
