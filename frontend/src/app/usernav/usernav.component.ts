import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  isloggedIn:boolean=false
  loggedInName:string
  constructor(private api:AuthService,private _route:Router) { }

  ngOnInit(): void {
    this.isloggedIn=this.api.getisloggedIn()
    this.loggedInName=this.api.getLoggedInName()
  }

  logout(){
    this.api.loggedOut()
    this._route.navigate(['/'])
  }
}
