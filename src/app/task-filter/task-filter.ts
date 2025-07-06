import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filter.html',
  styleUrls: ['./task-filter.css'],
})
export class TaskFilterComponent {
  @Output() filterChanged = new EventEmitter<string>();
  selectedFilter: string = 'all';

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterChanged.emit(filter);
  }
}
