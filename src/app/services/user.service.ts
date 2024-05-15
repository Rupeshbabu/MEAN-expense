import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId?: string;
  userIdChanged = new EventEmitter<string>();
  @Output() moneyAdded = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  setUserId(userId: string): void {
    this.userId = userId;
    this.userIdChanged.emit(userId);
  }

  getUserTransAndBalance(userId: any) {
    return this.http.get(`${environment.localAPI}/wallet/${userId}`);
  }

  updateWalletBalance(userId: string, amount: number) {
    return this.http.post(`${environment.localAPI}/wallet/${userId}`, amount);
  }

  addExpenseCall(userId: any, expenseData: any) {
    return this.http.post(
      `${environment.localAPI}/expense/${userId}`,
      expenseData
    );
  }

  getExpenseByUserId(userId: any) {
    return this.http.get(`${environment.localAPI}/expense/${userId}`);
  }

  updateExpense(expenseId: any, expenseData: any) {
    return this.http.patch(
      `${environment.localAPI}/expense/${expenseId}`,
      expenseData
    );
  }

  addCategory(categoryDetails: any) {
    return this.http.post(`${environment.localAPI}/category`, categoryDetails);
  }

  getCategoriesById(userId: any) {
    return this.http.get(`${environment.localAPI}/category/${userId}`);
  }
}
