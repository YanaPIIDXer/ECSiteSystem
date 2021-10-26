import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagenation',
  templateUrl: './pagenation.component.html',
  styleUrls: ['./pagenation.component.css']
})
export class PagenationComponent {
  @Input() currentPage: number
  @Input() maxPage: number
  pageArray: Array<number>
  @Output() click: EventEmitter<number>;

  constructor() {
    // ↓setupメソッドでやりたいんだけどコンストラクタ内で初期化しないとエラーになるみたい
    this.currentPage = 1;
    this.maxPage = 10;
    this.pageArray = Array(this.maxPage);
    this.click = new EventEmitter<number>();
  }

  setup(currentPage: number, maxPage: number): void {
    this.currentPage = currentPage;  
    this.maxPage = maxPage;
    this.pageArray = Array(this.maxPage);
  }

  onClick(page: number): void {
    this.click.emit(page);
  }
}
