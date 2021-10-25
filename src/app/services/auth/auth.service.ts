import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private credentials = {
    login: 'admin',
    password: 'admin'
  };
  
  private isUserLoggedIn = false;

  //fake login
  login(login:any, password:any) {
    return new Promise<void>((resolve, reject) => {
      if (login === this.credentials.login && password === this.credentials.password) {
        this.isUserLoggedIn = true;
        resolve();
      } else {
        reject();
      }
    })
  }
  // logOut() {
  //   this.isUserLoggedIn = false;
  //   this.layoutService.hideSidebar();
  // }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
