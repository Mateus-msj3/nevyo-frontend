import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(private readonly messageService: MessageService) {
  }

  showError(summary: string, detail: string): void {
    this.messageService.add({severity: 'error', summary: summary, detail: detail, life: 3000});
  }

  showSuccess(summary: string, detail: string): void {
    this.messageService.add({severity: 'success', summary: summary, detail: detail, life: 3000});
  }

  showInfo(summary: string, detail: string): void {
    this.messageService.add({severity: 'info', summary: summary, detail: detail, life: 3000});
  }

  showWarning(summary: string, detail: string): void {
    this.messageService.add({severity: 'warn', summary: summary, detail: detail, life: 3000});
  }

  clearMessages(key?: string): void {
    this.messageService.clear(key);
  }
}
