import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedbackItem } from '../model/service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private _feedbackSubject = new BehaviorSubject<FeedbackItem[]>([]);
  public readonly feedbacks$ = this._feedbackSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).slice(2, 9);
  }

  show(feedback: Omit<FeedbackItem, 'id'>): string {
    const id = this.generateId();
    const newFeedback: FeedbackItem = {
      id,
      duration: 3000, // default 3 seconds
      closable: true, // default closable
      ...feedback
    };

    const currentFeedbacks = this._feedbackSubject.value;
    this._feedbackSubject.next([...currentFeedbacks, newFeedback]);

    // Auto hide if duration is set and > 0
    if (newFeedback.duration && newFeedback.duration > 0) {
      setTimeout(() => {
        this.hide(id);
      }, newFeedback.duration);
    }

    return id;
  }

  success(message: string, duration?: number): string {
    return this.show({
      type: 'success',
      message,
      duration
    });
  }

  error(message: string, duration?: number): string {
    return this.show({
      type: 'error',
      message,
      duration: duration || 5000
    });
  }

  warning(message: string, duration?: number): string {
    return this.show({
      type: 'warning',
      message,
      duration
    });
  }

  info(message: string, duration?: number): string {
    return this.show({
      type: 'info',
      message,
      duration
    });
  }

  hide(id: string): void {
    const currentFeedbacks = this._feedbackSubject.value;
    const filteredFeedbacks = currentFeedbacks.filter(f => f.id !== id);
    this._feedbackSubject.next(filteredFeedbacks);
  }

  hideAll(): void {
    this._feedbackSubject.next([]);
  }
}