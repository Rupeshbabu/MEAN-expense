import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrl: './add-wallet.component.scss',
})
export class AddWalletComponent implements OnInit {
  userId: string | undefined;
  userIdSubscription!: Subscription;
  addWalletForm!: FormGroup;
  transHistory: any;
  currentBalance: number;
  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.addWalletForm = this.fb.group({
      currentAmount: ['', Validators.required],
    });

    this.userId = this.userService.userId;
    this.getWalletTransHistory();
  }

  addWalletBalance() {
    if (this.userId) {
      this.userService
        .updateWalletBalance(this.userId, this.addWalletForm.value)
        .subscribe((res: any) => {
          try {
            this.addWalletForm.reset();
            this.userService.moneyAdded.emit();
            this.getWalletTransHistory();
            this.toast.showSuccess(res.message, 'Add Wallet');
          } catch (error) {}
        });
    }
  }

  getWalletTransHistory() {
    if (this.userId) {
      this.userService
        .getUserTransAndBalance(this.userId)
        .subscribe((res: any) => {
          try {
            this.transHistory = res;
            this.currentBalance = res.wallet.amount;
            console.log(res.walletHistory);
          } catch (error) {}
        });
    }
  }
  getBalance(current: number, prev: number, type: string) {
    let amount: number = 0;
    switch (type) {
      case 'credit':
        amount = current + prev;
        break;
      case 'debit':
        amount = current - prev;
        break;
      default:
        break;
    }
    return amount;
  }

  getClass(type: string): string {
    let bootstrapClass = '';
    switch (type) {
      case 'credit':
        bootstrapClass = 'text-success'; // Bootstrap success class for credit
        break;
      case 'debit':
        bootstrapClass = 'text-danger'; // Bootstrap danger class for debit
        break;
      case 'opening':
        bootstrapClass = 'text-warning'; // Bootstrap warning class for opening
        break;
      default:
        break;
    }
    return `${bootstrapClass} text-bold`;
  }
}
