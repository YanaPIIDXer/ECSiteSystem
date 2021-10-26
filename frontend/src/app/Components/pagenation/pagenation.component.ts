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
  @Output() onClick: EventEmitter<number>;

  constructor() {
    // ↓setupメソッドでやりたいんだけどコンストラクタ内で初期化しないとエラーになるみたい
    this.currentPage = 1;
    this.maxPage = 10;
    this.pageArray = Array(this.maxPage);
    this.onClick = new EventEmitter<number>();
  }

  setup(currentPage: number, maxPage: number): void {
    this.currentPage = currentPage;  
    this.maxPage = maxPage;
    this.pageArray = Array(this.maxPage);
  }

  onClickPage(page: number): void {
    this.onClick.emit(page);
  }
}
