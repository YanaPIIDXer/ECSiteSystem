import { Component } from '@angular/core';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'admin-top',
  templateUrl: './admin-top.component.html',
  styleUrls: ['./admin-top.component.css']
})
export class AdminTopComponent {

  isProcessing: boolean

  constructor() {
    this.isProcessing = false;
  }

  async addSampleProducts(): Promise<void> {
    if (!confirm("サンプル商品を追加しますか？")) { return; }
    // 長時間かかる処理なのでブロッキング
    this.isProcessing = true;
    const res = await conn.post("/admin/product/add_samples", new URLSearchParams());
    this.isProcessing = false;
    if (res.status != 200 || !res.json.result) {
      alert("追加できませんでした");
      return;
    }
    alert("サンプル商品を追加しました");
  }

}
