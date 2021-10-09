import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product | null
  count: number

  constructor(private router: Router) {
    this.count = 0;
    this.product = null;
  }

  ngOnInit(): void {
  }

  async add(): Promise<void> {
    if (this.count <= 0) {
      alert("１個以上は追加してください。");
      return;
    }
    if (!confirm("カートに入れますか？")) { return; }
    var params = new URLSearchParams();
    // ↓何故か文字列型しか受け付けないらしい
    var id = this.product?.id.toString()!;
    var count = this.count.toString()!;
    params.append("id", id);
    params.append("count", count);
    const res = await conn.post("/user/cart/add", params);
    if (res.status != 200 || !res.json.result) {
      alert("追加に失敗しました。");
      return;
    }
    if (confirm("追加しました。カートを確認しますか？")) {
      this.router.navigate(["/cart"]);
    }
  }

}
