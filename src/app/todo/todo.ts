import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PaginationComponent } from '../pagination/pagination';
import { TaskFilterComponent } from '../task-filter/task-filter';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    TaskFilterComponent,
  ],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css'],
})
export class TodoComponent implements OnInit {
  newTask = '';
  tasks: { text: string; done: boolean }[] = [];
  filter: 'all' | 'completed' | 'incomplete' = 'all';

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => {
        this.tasks = data.map((item) => ({
          text: item.title,
          done: item.completed,
        }));
        this.updatePaginatedTasks();
      });
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.unshift({ text: this.newTask.trim(), done: false });
      this.newTask = '';
    }
    this.updatePaginatedTasks();
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    const maxPage = Math.ceil(this.tasks.length / this.itemsPerPage);
    if (this.currentPage > maxPage) {
      this.currentPage = maxPage;
    }
    this.updatePaginatedTasks();
  }
  currentPage = 1;
  itemsPerPage = 10;
  paginatedTasks: { text: string; done: boolean }[] = [];

  updatePaginatedTasks() {
    let filtered = this.tasks;

    if (this.filter === 'completed') {
      filtered = this.tasks.filter((t) => t.done);
    } else if (this.filter === 'incomplete') {
      filtered = this.tasks.filter((t) => !t.done);
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTasks = filtered.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedTasks();
  }
  onFilterChanged(newFilter: string) {
    this.filter = newFilter as any;
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedTasks();
  }
}
