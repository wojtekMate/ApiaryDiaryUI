import {Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {
  HttpHandler, HttpInterceptor,
  HttpRequest, HttpErrorResponse
} from "@angular/common/http";
import {throwError, BehaviorSubject} from "rxjs";
import {catchError, switchMap, finalize, filter, take} from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private injector: Injector,
    private router: Router) {
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({setHeaders: {Authorization: "Bearer " + token}})
    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authService = this.injector.get(AuthService);

    var token = (authService.isLoggedIn()) ? authService.getAuth()!.accessToken : null;
    if (token)
      return next.handle(this.addToken(req, token)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return this.handle400Error(error);
              case 401:
                return this.handle401Error(req, next);
              default:
                return throwError(error);
            }
          } else {
            return throwError(error);
          }
        })
      );

    return next.handle(req);
  }

  handle400Error(error: any) {
    if (error && error.status === 400 && error.error && error.error.error === "invalid_grant") {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }

    return throwError(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next("");

      const authService = this.injector.get(AuthService);

      return authService.refreshToken().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }),
        catchError(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }));
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        }));
    }
  }
  
  logoutUser() {
    // Route to the login page (implementation up to you)
    const authService = this.injector.get(AuthService);
    authService.logout();
    this.router.navigate(["/login"]).then(r => r.valueOf());
    return throwError("");
  }
}
