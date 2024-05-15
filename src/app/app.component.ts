import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expense-app-070524';
  constructor(private toastService: ToastService) {}

  showToast() {
    this.toastService.showSuccess(this.title, 'Success');
  }
}
