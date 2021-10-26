import { Component, OnInit } from '@angular/core';
import { HistoryItem } from 'src/app/Models/history-item';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {

  list: HistoryItem[]

  constructor() {
    this.list = [];
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/admin/order");
    if (res.status != 200) {
      alert("注文リストの取得に失敗しました");
      return;
    }
    console.log(res);
    this.list = res.json.list;
  }

  async send(id: number): Promise<void> {
    if (!confirm("発送しますか？")) { return; }
    
    var params = new URLSearchParams();
    params.append("id", id.toString());
    const res = await conn.post("/admin/order/send", params);
    if (res.status != 200 || !res.json.result) {
      alert("発送に失敗しました、");
      return;
    }
    for (var i = 0; i < this.list.length; i++)
    {
      if (this.list[i].id == id)
      {
        this.list.splice(i, 1);
        break;
      }
    }

    alert("発送しました。");
  }

  async cancel(id: number): Promise<void> {
    if (!confirm("キャンセルしますか？")) { return; }
    
    var params = new URLSearchParams();
    params.append("id", id.toString());
    const res = await conn.post("/admin/order/cancel", params);
    if (res.status != 200 || !res.json.result) {
      alert("キャンセルに失敗しました、");
      return;
    }
    for (var i = 0; i < this.list.length; i++)
    {
      if (this.list[i].id == id)
      {
        this.list.splice(i, 1);
        break;
      }
    }

    alert("キャンセルしました。");
  }
}
