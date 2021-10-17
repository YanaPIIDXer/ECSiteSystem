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
}
