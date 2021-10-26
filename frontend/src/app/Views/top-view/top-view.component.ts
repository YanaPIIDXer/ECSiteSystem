import { Component, OnInit } from '@angular/core';
import conn from '../../Modules/apiconnection';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.css']
})
export class TopViewComponent implements OnInit {

  list: Product[]
  keyword: String

  constructor() {
    this.list = [];
    this.keyword = "";
  }

  ngOnInit(): void {
    this.search();
  }

  async search(): Promise<void> {
    const res = await conn.get("/product/list?keyword=" + this.keyword);
    if (res.status != 200) {
      console.error("Search Failed.");
      console.log(res);
      this.list = [];
      return;
    }
    this.list = res.json.list;
  }
}
