import { Component } from '@angular/core';

@Component({
  selector: 'admin-top',
  templateUrl: './admin-top.component.html',
  styleUrls: ['./admin-top.component.css']
})
export class AdminTopComponent {

  isProcessing: boolean

  constructor() {
    this.isProcessing = false;
  }

}
