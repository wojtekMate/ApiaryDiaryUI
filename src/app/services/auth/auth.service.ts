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


  login(username: string, password: string): Observable<any> {
    var url = this.baseUrl + "Users/Account/sign-in";
    var data = {
      email: username,
      password: password
    };

    return this.getAuthFromServer(url, data);
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
      var url = this.baseUrl + "api/token/auth";
      var data = {
        client_id: this.clientId,
        grant_type: "refresh_token",
        refresh_token: this.getAuth()!.refreshToken,
        scope: "offline_access profile email"
      }
  
      return this.getAuthFromServer(url, data);
    }

  setAuth(auth: TokenResponse | null): boolean {
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
