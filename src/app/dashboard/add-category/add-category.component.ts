import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  categories: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.getCategoryList();
  }

  getCategoryList() {
    const userId = this.userService.userId;
    this.userService.getCategoriesById(userId).subscribe((res: any) => {
      if (res) {
        this.categories = res.data.categoryList;
        console.log(this.categories);
      }
    });
  }

  addCategory() {
    this.addCategoryForm.value.userId = this.userService.userId;
    this.userService
      .addCategory(this.addCategoryForm.value)
      .subscribe((res: any) => {
        try {
          if (res) {
            if (res.status === 'success') {
              this.toast.showSuccess(res.message, 'Category');
              this.addCategoryForm.reset();
              this.getCategoryList();
            }
          }
        } catch (error) {}
      });
  }
}
