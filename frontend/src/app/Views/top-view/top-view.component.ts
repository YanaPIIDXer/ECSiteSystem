import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import conn from '../../Modules/apiconnection';
import { Product } from '../../Models/product';
import { PagenationComponent } from 'src/app/Components/pagenation/pagenation.component';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.css']
})
export class TopViewComponent implements OnInit {

  list: Product[]
  keyword: String
  showHitCount: boolean
  hitCount: number
  currentPage: number
  @ViewChild(PagenationComponent) pagenation!: PagenationComponent

  constructor() {
    this.list = [];
    this.keyword = "";
    this.showHitCount = false;
    this.hitCount = 0;
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.search();
  }

  onKeywordSearch(): void {
    this.currentPage = 1;
    this.search();
  }

  async search(): Promise<void> {
    const res = await conn.get("/product/list?keyword=" + this.keyword + "&page=" + this.currentPage);
    if (res.status != 200) {
      console.error("Search Failed.");
      console.log(res);
      this.list = [];
      return;
    }
    this.list = res.json.list;
    this.showHitCount = this.keyword != "";
    this.hitCount = res.json.count;
    this.pagenation.setup(this.currentPage, res.json.maxPage);
    document.scrollingElement!.scrollTop = 0;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.search();
  }
}
