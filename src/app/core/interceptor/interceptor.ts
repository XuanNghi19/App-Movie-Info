import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
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
    // console.log('Interceptor activated for:', req.url);

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
          // Success — không cần log gì nếu không cần
        },
        error: (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.handleHttpError(error);
          } else {
            console.error('❌ Unknown Error:', error);
          }
        },
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse): void {
    const status = error.status;

    switch (status) {
      case 0:
        console.error('❌ Không thể kết nối đến máy chủ (Network Error)');
        break;

      case 400:
        console.error(
          '⚠️ 400 Bad Request – Dữ liệu không hợp lệ gửi lên máy chủ'
        );
        break;

      case 401:
        console.error(
          '🔒 401 Unauthorized – Bạn chưa đăng nhập hoặc token hết hạn'
        );
        break;

      case 403:
        console.error(
          '⛔ 403 Forbidden – Bạn không có quyền truy cập tài nguyên này'
        );
        break;

      case 404:
        console.error('📭 404 Not Found – Không tìm thấy tài nguyên yêu cầu');
        break;

      case 408:
        console.error(
          '⏱️ 408 Request Timeout – Yêu cầu mất quá nhiều thời gian'
        );
        break;

      case 500:
        console.error('💥 500 Internal Server Error – Lỗi máy chủ');
        break;

      case 503:
        console.error(
          '🛠️ 503 Service Unavailable – Máy chủ đang bảo trì hoặc quá tải'
        );
        break;

      default:
        console.error(`❌ Lỗi không xác định (HTTP ${status})`, error.message);
        break;
    }

    if (error.error?.message) {
      console.error('💡 Chi tiết lỗi:', error.error.message);
    }
  }
}
