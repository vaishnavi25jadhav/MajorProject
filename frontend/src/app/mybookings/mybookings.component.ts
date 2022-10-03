import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {

  bookings:any[]
  constructor(private api:AdminService,private _route:Router,private auth:AuthService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.loadBooking()
  }

  loadBooking(){
    const userid=this.auth.getUserId()
    this.api.getUserBookings(userid).subscribe({
      next:resp=>{
        this.bookings=resp
      }
    })
  }

  updateStatus(status:string,id:number){
    const res=confirm('Are you sure to cancel this booking')
    if(res){
      this.api.updateStatus(id,status).subscribe({
        next:resp=>{
          this.toast.success('Booking cancelled')
          this.loadBooking()
        }
      })
    }
  }
}
