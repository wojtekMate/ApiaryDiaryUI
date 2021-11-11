import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import decode from "jwt-decode";

@Injectable()
export class AuthCanLoadGuard implements CanLoad {
  constructor(private authService : AuthService, private router : Router) {}

  canLoad(route : Route): Observable<boolean> | Promise<boolean> | boolean {

    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data?.expectedRole;
    const token = sessionStorage.getItem("auth");
    const tokenPayload: any = decode(token ?? "");
    var roles: any = [];
    roles = roles.concat(tokenPayload.role);
    console.log("role",roles);
    console.log("role",expectedRole);
    if (!roles.some((r: any) => expectedRole.indexOf(r) >= 0)) {
      console.log("false");
      this.router.navigate(['/login']);
      return false;
    }
    console.log("true");
    return true;
  }

   

  
}
