import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-image',
  templateUrl: './item-image.component.html',
  styleUrls: ['./item-image.component.css']
})
export class ItemImageComponent implements OnInit {
  @Input() src: string
  @Input() forCard: boolean

  constructor() {
    this.src = "";
    this.forCard = false;
  }
  
  ngOnInit(): void {
    if (this.src == "") {
      this.src = "assets/noimage.jpg";
    }
  }

}
