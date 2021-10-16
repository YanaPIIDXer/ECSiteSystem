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
    this.calcTotalPrice();
  }

  private calcTotalPrice(): void {
    this.totalPrice = 0;
    for (let item of this.list) {
      item.changedCount = item.count;
      this.totalPrice += item.price * item.count;
    }
  }

  async change(id: number, count: number): Promise<void> {
    if (!confirm("数量を変更しますか？")) { return; }

    var params = new URLSearchParams();
    params.append("id", id.toString());
    params.append("count", count.toString());
    const res = await conn.post("/user/cart/change", params);
    if (res.status != 200 || !res.json.result) {
      alert("変更に失敗しました。");
      return;
    }
    
    for (var i = 0; i < this.list.length; i++)
    {
      if (this.list[i].id == id)
      {
        if (count > 0)
        {
          this.list[i].count = count;
        } else {
          this.list.splice(i, 1);
        }
        break;
      }
    }

    this.calcTotalPrice();
    alert("変更しました。");
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
