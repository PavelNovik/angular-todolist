import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    withCredentials: true,
    headers: new HttpHeaders().append('api-key', environment['apiKey']),
  });
  return next(req);
};
