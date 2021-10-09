import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private role: string

  constructor() {
    this.role = "";
  }

  isLogIn(): boolean { return this.role != ""; }
  isUser(): boolean { return this.role == "USER"; }
  isAdmin(): boolean { return this.role == "ADMIN"; }
  logInAsUser(): void { this.role = "USER"; }
  logInAsAdmin(): void { this.role = "ADMIN"; }
  logOut(): void { this.role = ""; }
}
