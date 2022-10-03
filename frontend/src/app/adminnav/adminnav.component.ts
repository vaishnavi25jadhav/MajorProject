import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  isloggedIn:boolean=false
  loggedInName:string
  constructor(private toast:ToastrService,private api:AuthService,private _route:Router) { 
    // this.api.getLoggedIn().subscribe({
    //   next:(resp:boolean)=>
    //   {
    //     console.log("loggedin",resp)
    //     if(resp){
    //       this._route.navigate['/']
    //     }
    //     this.isloggedIn=resp   
    //     console.log("logged in",resp)     
    //   }
    // })

  }

  ngOnInit(): void {
    const check=this.api.getisloggedIn()
    console.log("loggedin => ",check)
    if(!check){
      this._route.navigateByUrl('/')
    }
    this.loggedInName=this.api.getLoggedInName()
  }

  loggedout(){  
    console.log('logging out') 
    //this.toast.success('Logged out successfully')
    sessionStorage.clear()
    //this.api.loggedOut()
    this._route.navigate(['/'])
  }

}
