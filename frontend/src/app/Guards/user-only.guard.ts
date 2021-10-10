import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../Services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class UserOnlyGuard implements CanActivate {
  constructor(private logInService: LogInService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.logInService.isUser();
  }
  
}
