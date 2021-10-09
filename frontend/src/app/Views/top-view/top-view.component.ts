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

  constructor() {
    this.list = [];
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/product/list");
    if (res.status != 200) { return; }
    this.list = res.json;
  }
}
