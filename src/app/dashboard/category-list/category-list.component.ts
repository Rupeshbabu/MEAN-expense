import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  @Input() categoryList: any;

  constructor() {}
  ngOnInit(): void {
    console.log(this.categoryList);
  }
}
