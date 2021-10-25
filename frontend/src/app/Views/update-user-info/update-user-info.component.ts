import { Component, OnInit } from '@angular/core';
import conn from '../../Modules/apiconnection';
import { DummyCard } from '../../Models/dummy-card';

@Component({
  selector: 'update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {
  name: string
  email: string
  password: string
  address: string
  cardNumber: string
  updateCardInfo: boolean
  dummyCards: DummyCard[]

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.address = "";
    this.cardNumber = "XXXX-XXXX-XXXX-";
    this.updateCardInfo = false;
    this.dummyCards =  [
      {name: "VISA1", number: "4111111111111111"},
      {name: "VISA2", number: "4242424242424242"},
      {name: "VISA3", number: "4012888888881881"},
      {name: "MasterCard1", number: "5555555555554444"},
      {name: "MasterCard2", number: "5105105105105100"},
      {name: "American Express1", number: "378282246310005"},
      {name: "American Express2", number: "371449635398431"},
      {name: "JCB1", number: "3530111333300000"},
      {name: "JCB2", number: "3566002020360505"},
    ];
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/user/info");
    this.name = res.json.name;
    this.email = res.json.email;
    this.address = res.json.address;
    this.cardNumber = "XXXX-XXXX-XXXX-" + res.json.cardFinalNumber;
  }

}
