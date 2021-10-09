import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StripeCardElementOptions } from '@stripe/stripe-js';

interface DummyCard {
  name: string
  number: string
}

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  name: string
  email: string
  password: string
  confirmPassword: string
  address: string
  dummyCards: DummyCard[]
  cardElementOptions: StripeCardElementOptions

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.address = "";
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

    // https://dev.classmethod.jp/articles/customize-stripe-elements/ より失敬
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

  ngOnInit(): void {
  }

  async submit(form: NgForm): Promise<void> {
    if (form.invalid) { return; }
    if (!confirm("登録しますか？")) { return; }
  }

}
