import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.address = "";
  }

  ngOnInit(): void {
  }

}
