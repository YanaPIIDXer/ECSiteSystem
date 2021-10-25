import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import conn from '../../Modules/apiconnection';
import { DummyCard } from '../../Models/dummy-card';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Services/log-in.service';

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
  cardElementOptions: StripeCardElementOptions
  @ViewChild("cardNumberElement") cardElement!: StripeCardNumberComponent

  constructor(private stripeService: StripeService, private router: Router, private logInService: LogInService) {
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
    this.cardElementOptions = {
      style: {
        base: {
          color: '#32325D',
          fontWeight: 500,
          fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
          fontSize: '1.2em',
          fontSmoothing: 'antialiased',
          '::placeholder': {
          color: '#CFD7DF'
          },
          ':-webkit-autofill': {
            color: '#e39f48'
          }
        },
        invalid: {
          color: '#E25950',
          '::placeholder': {
          color: '#FFCCA5'
          }
        }
      }
    }
  }

  async ngOnInit(): Promise<void> {
    const res = await conn.get("/user/info");
    this.name = res.json.name;
    this.email = res.json.email;
    this.address = res.json.address;
    this.cardNumber = "XXXX-XXXX-XXXX-" + res.json.cardFinalNumber;
  }

  submit(form: NgForm): void {
    if (form.invalid) { return; }
    if (!confirm("更新しますか？")) { return; }

    if (this.updateCardInfo) {
      this.stripeService.createToken(this.cardElement.element)
                        .subscribe((result) => {
                          if (result.error) {
                            alert("カードの認証に失敗しました");
                            return;
                          }
                          var token = result.token?.id!;
                          this.send(token);
                        });
    }
    else {
      this.send("");
    }
  }

  private async send(token: string): Promise<void> {
    var params = new URLSearchParams();
    params.append("name", this.name);
    params.append("email", this.email);
    params.append("password", this.password);
    params.append("address", this.address);
    params.append("token", token);
    console.log(token);
    const res = await conn.post("/user/update", params);
    if (res.status != 200 || !res.json.result) {
      alert("更新に失敗しました");
      return;
    }
    alert("更新しました");
    this.logInService.logInAsUser(this.name);
    this.router.navigate(["/"]);
}
}
