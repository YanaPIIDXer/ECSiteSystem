import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-image',
  templateUrl: './item-image.component.html',
  styleUrls: ['./item-image.component.css']
})
export class ItemImageComponent {
  @Input() src: string
  @Input() forCard: boolean

  constructor() {
    this.src = "";
    this.forCard = false;
  }

}
