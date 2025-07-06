import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PaginationComponent } from '../pagination/pagination';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css'],
})
export class TodoComponent implements OnInit {
  newTask = '';
  tasks: { text: string; done: boolean }[] = [];

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
      this.tasks.push({ text: this.newTask.trim(), done: false });
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
  currentPage = 1;
  itemsPerPage = 10;
  paginatedTasks: { text: string; done: boolean }[] = [];

  updatePaginatedTasks() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedTasks();
  }
}
