export interface FeedbackItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // milliseconds, 0 means no auto-hide
  closable?: boolean;
}