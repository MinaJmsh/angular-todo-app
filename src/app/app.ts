import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo';
import { ToastComponent } from './toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected title = 'todo-app';
}
