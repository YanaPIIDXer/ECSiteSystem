import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Services/log-in.service';
import conn from '../../../Modules/apiconnection';

@Component({
  selector: 'nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.css']
})
export class NavBarAdminComponent implements OnInit {

  constructor(private logInService: LogInService, private router: Router) { }

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    if (!confirm("ログアウトしますか？")) { return; }

    await conn.get("/admin/logout");
    this.logInService.logOut();
    this.router.navigate(["/"]);
  }

}
