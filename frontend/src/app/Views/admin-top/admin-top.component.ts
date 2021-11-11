import { Component, OnInit } from '@angular/core';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'admin-top',
  templateUrl: './admin-top.component.html',
  styleUrls: ['./admin-top.component.css']
})
export class AdminTopComponent implements OnInit {

  isProcessing: boolean
  isAbleAddSample: boolean

  constructor() {
    this.isProcessing = false;
    this.isAbleAddSample = false;
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/admin/product/check_able_add_samples");
    this.isAbleAddSample = (res.status == 200 && res.json.result);
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
