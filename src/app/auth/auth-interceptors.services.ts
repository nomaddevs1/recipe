import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import AuthService from './auth.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable()
export default class AuthInterceptorService implements HttpInterceptor {
  constructor(private authServices: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authServices.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modified = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modified);
      })
    );
  }
}
