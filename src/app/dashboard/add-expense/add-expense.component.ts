import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent implements OnInit {
  addExpenseForm!: FormGroup;
  categories: any;
  expenseHistory: any;
  expenseId: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    this.addExpenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      dateOfTrans: ['', Validators.required],
    });
    this.getCategoryList();
    this.getExpenses();
  }

  getCategoryList() {
    const userId = this.userService.userId;
    this.userService.getCategoriesById(userId).subscribe((res: any) => {
      if (res.status === 'success') {
        this.categories = res.data.categoryList;
      }
    });
  }

  addExpense() {
    if (this.expenseId._id) {
      this.addExpenseForm.value.userId = this.expenseId.userId;
      this.userService
        .updateExpense(this.expenseId._id, this.addExpenseForm.value)
        .subscribe(
          (res: any) => {
            if (res.status === 'success') {
              this.toast.showSuccess(res.message, 'Expense Update');
              this.addExpenseForm.reset();
              this.userService.moneyAdded.emit();
              this.getExpenses();
            }
          },
          (error) => {
            if (error.status === 'fail') {
              this.toast.showError(error.message, 'error');
            }
          }
        );
    } else {
      const userId = this.userService.userId;
      if (this.addExpenseForm.valid) {
        this.userService
          .addExpenseCall(userId, this.addExpenseForm.value)
          .subscribe((res: any) => {
            if (res.status === 'success') {
              this.toast.showSuccess(
                `Available Balance: ${res.data.availableBalance}`,
                'Expenses'
              );
              this.addExpenseForm.reset();
              this.userService.moneyAdded.emit();
              this.getExpenses();
            }
          });
      }
    }
  }

  getExpenses() {
    const userId = this.userService.userId;
    this.userService.getExpenseByUserId(userId).subscribe((res: any) => {
      if (res.status === 'success') {
        const expenses = res.data.expense;
        this.expenseHistory = expenses.map((expense: { category: any }) => {
          const category = this.categories.find(
            (cat: { _id: any }) => cat._id === expense.category
          );
          return {
            ...expense,
            categoryName: category ? category.name : 'Unknown',
          };
        });
      }
    });
  }

  loadExpenseRecord(event: any) {
    this.expenseId = event;
    this.addExpenseForm.patchValue(event);
    console.log(event);
  }
}
