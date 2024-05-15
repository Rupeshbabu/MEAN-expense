import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = '') {
    this.toastr.success(message, title, { timeOut: 3000 });
  }

  showError(message: string, title: string = '') {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string = '') {
    this.toastr.warning(message, title);
  }

  // You can define other methods for different toast types (info, warning, etc.)
}
