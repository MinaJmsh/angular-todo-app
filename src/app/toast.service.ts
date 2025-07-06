import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private nextId = 0;
  messages: { id: number; text: string; type: 'success' | 'error' | 'info' }[] =
    [];

  show(text: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = this.nextId++;
    this.messages.push({ id, text, type });

    setTimeout(() => this.dismiss(id), 3000);
  }

  dismiss(id: number) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}
