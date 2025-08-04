import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() maxVisiblePages: number = 5; // Số trang hiển thị tối đa
  @Input() showFirstLast: boolean = true; // Hiển thị nút First/Last
  @Input() showPrevNext: boolean = true; // Hiển thị nút Previous/Next
  @Input() showPageNumbers: boolean = true; // Hiển thị số trang
  @Input() showPageInfo: boolean = true; // Hiển thị thông tin trang (x/y)
  @Input() disabled: boolean = false; // Vô hiệu hóa toàn bộ pagination

  @Output() pageChange = new EventEmitter<number>();

  visiblePages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['currentPage'] ||
      changes['totalPages'] ||
      changes['maxVisiblePages']
    ) {
      this.calculateVisiblePages();
    }
  }

  private calculateVisiblePages(): void {
    const pages: number[] = [];

    if (this.totalPages <= this.maxVisiblePages) {
      // Nếu tổng số trang <= maxVisiblePages, hiển thị tất cả
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Tính toán trang hiển thị với logic phức tạp hơn
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

      // Điều chỉnh start nếu end đã đạt tới totalPages
      if (end === this.totalPages) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    this.visiblePages = pages;
  }

  onPageClick(page: number): void {
    if (
      page !== this.currentPage &&
      page >= 1 &&
      page <= this.totalPages &&
      !this.disabled
    ) {
      this.pageChange.emit(page);
    }
  }

  goToFirst(): void {
    this.onPageClick(1);
  }

  goToPrevious(): void {
    this.onPageClick(this.currentPage - 1);
  }

  goToNext(): void {
    this.onPageClick(this.currentPage + 1);
  }

  goToLast(): void {
    this.onPageClick(this.totalPages);
  }

  // Helper methods cho template
  get canGoPrevious(): boolean {
    return this.currentPage > 1 && !this.disabled;
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages && !this.disabled;
  }

  get showStartEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[0] > 1;
  }

  get showEndEllipsis(): boolean {
    return (
      this.visiblePages.length > 0 &&
      this.visiblePages[this.visiblePages.length - 1] < this.totalPages
    );
  }
}
