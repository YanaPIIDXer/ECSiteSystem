import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Services/log-in.service';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  password: string
  constructor(private logInService: LogInService, private router: Router) {
    this.password = "";
  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    var params = new URLSearchParams();
    params.append("name", "admin");
    params.append("password", this.password);
    const res = await conn.post("/admin/login", params);
    if (res.status != 200) {
      alert("ログインに失敗しました。");
      return;
    }
    this.logInService.logInAsAdmin();
    this.router.navigate(["/admin_top"]);
  }

}
