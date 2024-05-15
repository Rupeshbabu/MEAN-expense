import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastComponent } from './utils/toast/toast.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { AddExpenseComponent } from './dashboard/add-expense/add-expense.component';
import { AddCategoryComponent } from './dashboard/add-category/add-category.component';
import { ExpenseListComponent } from './dashboard/expense-list/expense-list.component';
import { CategoryListComponent } from './dashboard/category-list/category-list.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { AddWalletComponent } from './dashboard/add-wallet/add-wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    SignUpComponent,
    SignInComponent,
    PageNotFoundComponent,
    DashboardComponent,
    MainComponent,
    AddExpenseComponent,
    AddCategoryComponent,
    ExpenseListComponent,
    CategoryListComponent,
    HistoryComponent,
    AddWalletComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
