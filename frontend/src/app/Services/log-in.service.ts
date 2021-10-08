import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private role: string

  constructor() {
    this.role = "";
  }

  IsLogIn(): boolean { return this.role != ""; }
  IsUser(): boolean { return this.role == "USER"; }
  IsAdmin(): boolean { return this.role == "ADMIN"; }
  LogInAsUser(): void { this.role = "USER"; }
  LogInAsAdmin(): void { this.role = "ADMIN"; }
  LogOut(): void { this.role = ""; }
}
