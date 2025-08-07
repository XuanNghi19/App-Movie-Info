import { catchError, Observable, of } from "rxjs";
import { FeedbackService } from "../services/feedback.service";

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\r?\n+/)        // tách theo xuống dòng (Windows: \r\n, Unix: \n)
    .map(p => p.trim())     // loại bỏ khoảng trắng thừa
    .filter(p => p.length); // loại bỏ đoạn rỗng
}

export const safeRequest = <T>(obs$: Observable<T>, label: string, feedbackService: FeedbackService): Observable<T | null> => {
  return obs$.pipe(
    catchError((err) => {
      console.error(`${label} API failed`, err);
      feedbackService.error(`${label} API failed: ${err}`, 3000);
      return of(null);
    })
  );
};