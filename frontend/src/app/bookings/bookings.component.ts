import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings:any[]
  constructor(private api:AdminService,private _route:Router,private toast:ToastrService) { }

  ngOnInit(): void {
    this.loadBooking()
  }

  updateBooking(status){

  }

  loadBooking(){
    this.api.getAllBookings().subscribe({
      next:resp=>{
        this.bookings=resp
      }
    })
  }

  updateStatus(status:string,id:number){
      this.api.updateStatus(id,status).subscribe({
        next:resp=>{
          this.toast.success('Booking status updated')
          this.loadBooking()
        }
      })
  }

}
