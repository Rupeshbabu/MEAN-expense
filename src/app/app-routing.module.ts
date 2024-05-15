import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './dashboard/add-expense/add-expense.component';
import { AddCategoryComponent } from './dashboard/add-category/add-category.component';
import { ExpenseListComponent } from './dashboard/expense-list/expense-list.component';
import { CategoryListComponent } from './dashboard/category-list/category-list.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { AddWalletComponent } from './dashboard/add-wallet/add-wallet.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'add-wallet', component: AddWalletComponent },
      { path: 'expense', component: AddExpenseComponent },
      { path: 'expense/:id', component: AddExpenseComponent },
      { path: 'expense-list', component: ExpenseListComponent },
      { path: 'category', component: AddCategoryComponent },
      { path: 'category/:id', component: AddCategoryComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
