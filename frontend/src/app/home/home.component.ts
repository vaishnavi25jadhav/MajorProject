import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',  //router path
  templateUrl: './home.component.html',  // the UI template
  styleUrls: ['./home.component.css']     //component level custom css for the UI template
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
