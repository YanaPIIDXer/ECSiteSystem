import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private role: string

  constructor() {
    const role = sessionStorage.getItem("role");
    this.role = role ? role : "";
  }

  isLogIn(): boolean { return this.role != ""; }
  isUser(): boolean { return this.role == "USER"; }
  isAdmin(): boolean { return this.role == "ADMIN"; }
  logInAsUser(): void { this.setRole("USER"); }
  logInAsAdmin(): void {this.setRole("ADMIN"); }
  logOut(): void { this.role = ""; }

  private setRole(role: string): void {
    this.role = role;
    sessionStorage.setItem("role", role);
  }
}
