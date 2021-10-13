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
        console.log("resolve");
        resolve();
      } else {
        console.log("reject");

        console.log(login);
        console.log(password);
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
