import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  email: string
  password: string

  constructor(private router: Router) {
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    var params = new URLSearchParams();
    params.append("email", this.email);
    params.append("password", this.password);
    const res = await conn.post("/user/login", params);
    if (res.status != 200) {
      alert("ログインに失敗しました");
      return;
    }

    this.router.navigate(["/"]);
  }

}
