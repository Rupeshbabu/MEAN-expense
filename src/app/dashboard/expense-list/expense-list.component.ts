import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit {
  @Input() getExpenses: any;
  @Output() updateExpense = new EventEmitter<any>();
  categories: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  // getCategoryList() {
  //   const userId = this.userService.userId;
  //   this.userService.getCategoriesById(userId).subscribe((res: any) => {
  //     if (res.status === 'success') {
  //       this.categories = res.data.categoryList;
  //     }
  //   });
  // }
  // getCategoryNameById(categoryId: number): string {
  //   const category = this.categories.find((cat: any) => cat.id === categoryId);
  //   return category ? category.name : 'Unknown';
  // }

  editData(data: any) {
    console.log(data);
    this.updateExpense.emit(data);
  }
}
