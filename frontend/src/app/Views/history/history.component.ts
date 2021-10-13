import { Component, OnInit } from '@angular/core';
import { HistoryItem } from 'src/app/Models/history-item';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  list: HistoryItem[]
  
  constructor() {
    this.list = [];
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/user/history");
    if (res.status != 200) {
      alert("購入履歴の取得に失敗しました");
      return;
    }
    this.list = res.json.list;
  }

}
