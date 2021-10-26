import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private role: string

  private name: string

  constructor() {
    const role = sessionStorage.getItem("role");
    this.role = role ? role : "";
    const name = sessionStorage.getItem("name");
    this.name = name ? name : "";
  }

  isLogIn(): boolean { return this.role != ""; }
  isUser(): boolean { return this.role == "USER"; }
  isAdmin(): boolean { return this.role == "ADMIN"; }
  logInAsUser(name: string): void {
    this.setRole("USER");
    this.name = name;
    sessionStorage.setItem("name", name);
  }
  getUserName(): string { return this.name; }
  logInAsAdmin(): void {this.setRole("ADMIN"); }
  logOut(): void { this.role = ""; }

  private setRole(role: string): void {
    this.role = role;
    sessionStorage.setItem("role", role);
  }
}
