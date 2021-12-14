import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import decode from "jwt-decode";
import { TokenResponse } from '../../interfaces/tokenResponse';

@Injectable()
export class AuthCanLoadGuard implements CanLoad {
  constructor(private authService : AuthService, private router : Router) {}

  canLoad(route : Route): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data?.expectedRole;

    var token = sessionStorage.getItem("auth");
    var tokenResponse = JSON.parse(token || '{}');

    const tokenPayload: any = decode(tokenResponse.accessToken ?? "");

    var roles: any = [];
    roles = roles.concat(tokenResponse.role);

    if (!roles.some((r: any) => expectedRole.indexOf(r) >= 0)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  } 
}
