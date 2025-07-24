import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

export const DEFAULT_TIMEOUT = 30000;

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor activated for:', req.url);

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.bearer_key}`,
        accept: 'application/json',
      },
    });

    return next.handle(clonedRequest).pipe(
      timeout(DEFAULT_TIMEOUT),
      tap({
        next: (event: HttpEvent<any>) => {
          // log hoặc xử lý response nếu cần
          // console.log('✅ Response received');
        },
        error: (error: any) => {
          console.error('❌ HTTP error:', error.message);
        },
      })
    );
  }
}
