import { Component, OnInit } from '@angular/core';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.css']
})
export class TopViewComponent implements OnInit {

  constructor() { }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/product/list");
    console.log(res);
  }

}
