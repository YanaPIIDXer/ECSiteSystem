import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Services/log-in.service';
import conn from '../../../Modules/apiconnection';

@Component({
  selector: 'nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css']
})
export class NavBarUserComponent implements OnInit {

  constructor(public logInService: LogInService, private router: Router) { }

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
      if (!confirm("ログアウトしますか？")){ return; }
      await conn.get("/user/logout");
      this.logInService.logOut();
      this.router.navigate(["/"]);
  }
}
