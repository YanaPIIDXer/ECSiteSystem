import { Component, OnInit } from '@angular/core';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

  constructor() { }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/user/info");
    console.log(res);
  }

}
