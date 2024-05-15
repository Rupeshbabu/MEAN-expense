import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userDetails: any;
  wallet: number = 0;
  moneyAddedSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.moneyAddedSubscription = this.userService.moneyAdded.subscribe(() => {
      this.getUserWallet();
    });
  }

  getUserDetails() {
    const isToken = this.auth.getToken();
    if (isToken) {
      const userData = this.auth.getUserFromToken();
      this.userDetails = userData;
      this.userService.setUserId(this.userDetails.id);
      this.getUserWallet();
    } else {
      this.router.navigate(['/main/signin']);
    }
  }
  getUserWallet() {
    const userId = this.userDetails.id;
    if (userId) {
      this.userService.getUserTransAndBalance(userId).subscribe((res: any) => {
        try {
          this.wallet = res.wallet.amount;
          console.log(this.wallet);
        } catch (error) {}
      });
    }
  }

  onLogout() {
    this.auth.removeToken();
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['main/signin']);
  }

  ngOnDestroy(): void {
    this.moneyAddedSubscription.unsubscribe();
  }
}
