import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";
import { environment } from 'src/environments/environment';
import { TokenResponse } from 'src/app/interfaces/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private credentials = {
    login: 'admin',
    password: 'admin'
  };

  private baseUrl: string = environment.baseUrl;
  authKey: string = "auth";
  clientId: string = "ApiaryDiaryWebsite";

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) {
}
  //fake login
  private isUserLoggedIn = false;
  fakeLogin(login:any, password:any) {
    return new Promise<void>((resolve, reject) => {
      if (login === this.credentials.login && password === this.credentials.password) {
        this.isUserLoggedIn = true;
        resolve();
      } else {
        reject();
      }
    })
  }

  ActivateAccount(token: string): Observable<any> {
    var url = this.baseUrl + "Users/Account/Activate";
    var data = {
      token: token
    };
console.log(data);
console.log(url);
    return this.http.put(url, data);
  }

  login(email: string, password: string): Observable<any> {
    var url = this.baseUrl + "Users/Account/sign-in";
    var data = {
      email: email,
      password: password
    };

    return this.getAuthFromServer(url, data);
  }
  
  SignUp(email: string, password: string): Observable<any> {
    var url = this.baseUrl + "Users/Account/sign-up";
    var data = {
      email: email,
      password: password,
      role: "user",
      claims: { "permissions": ["all"]}
    };
    return this.http.post(url, data);
  }

  logout(): boolean {
    this.setAuth(null);
    return true;
  }

  getAuthFromServer(url: string, data: any): Observable<any> {
    return this.http.post<TokenResponse>(url, data)
      .pipe(
        map((res) => {
          let token = res && res.accessToken;
          if (token) {
            console.log("token nie null");
            console.log(token);
            this.setAuth(res);
            return true;
          }
          return throwError("Unauthorized");
        }),
        catchError(error => {
          return new Observable<any>(error);
        })
      );
  }

    refreshToken(): Observable<any> {
      var url = this.baseUrl + "Account/refresh-tokens";
      var data = {
        refresh_token: this.getAuth()!.refreshToken
      }
      console.log(data);
      console.log(url);
      return this.getAuthFromServer(url, data);
    }

  setAuth(auth: TokenResponse | null): boolean {
    console.log("serAuth")
    if (isPlatformBrowser(this.platformId)) {
      if (auth) {
        sessionStorage.setItem(
          this.authKey,
          JSON.stringify(auth));
      }
      else {
        sessionStorage.removeItem(this.authKey);
      }
    }
    return true;
  }

  getAuth(): TokenResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      var i = sessionStorage.getItem(this.authKey);
      if (i) {
        return JSON.parse(i);
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.authKey) != null;
      //return this.isUserLoggedIn;
    }
    return false;
  }
  
}
