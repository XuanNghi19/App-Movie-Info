import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { feedbackAnimations } from 'src/app/animations/feedback-animations';
import { FeedbackItem } from 'src/app/core/model/service';
import { FeedbackService } from 'src/app/core/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: feedbackAnimations
})
export class FeedbackComponent implements OnInit {
  feedbacks$: Observable<FeedbackItem[]>;

  constructor(private feedbackService: FeedbackService) {
    this.feedbacks$ = this.feedbackService.feedbacks$;
  }

  ngOnInit(): void {}

  closeFeedback(id: string): void {
    this.feedbackService.hide(id);
  }

  trackByFn(index: number, item: FeedbackItem): string {
    return item.id;
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-times-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-info-circle';
    }
  }
}