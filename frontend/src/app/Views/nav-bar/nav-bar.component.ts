import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public logInService: LogInService) { }

  ngOnInit(): void {
  }

}
