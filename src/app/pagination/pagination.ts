import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;

  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
  get visiblePages(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;

    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(total, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
