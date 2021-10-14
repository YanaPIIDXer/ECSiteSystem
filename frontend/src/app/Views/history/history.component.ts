import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryItem } from 'src/app/Models/history-item';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  list: HistoryItem[]
  
  constructor(private router: Router) {
    this.list = [];
  }

  ngOnInit(): void {
    this.updateList();
  }

  private async updateList(): Promise<void> {
    const res = await conn.get("/user/history");
    if (res.status != 200) {
      alert("購入履歴の取得に失敗しました");
      return;
    }
    this.list = res.json.list;
  }

  async cancel(id: number): Promise<void> {
    if (!confirm("注文をキャンセルしますか？")) { return; }
    var params = new URLSearchParams();
    params.append("historyId", id.toString());
    const res = await conn.post("/user/cancel", params);
    if (res.status != 200 || !res.json.result) {
      alert("キャンセルに失敗しました。");
      return;
    }
    alert("キャンセルしました、");
    this.updateList();
  }

}
