import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-bkdetails',
  templateUrl: './bkdetails.component.html',
  styleUrls: ['./bkdetails.component.css']
})
export class BkdetailsComponent implements OnInit {

  data:any
  baseUrl=environment.baseURL
  balance:number
  payments:any[]
  myform:FormGroup
  constructor(private api:AdminService,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private toast:ToastrService) {    
   }

  ngOnInit(): void {
    const bkid=this.route.snapshot.paramMap.get('id')
    console.log(bkid)
    this.loadData(bkid)
    this.createForm()
    this.myform.patchValue({bookingId:parseInt(bkid)})
  }

  createForm(){
    this.myform=this.fb.group({
      'amount':['',Validators.required],
      'cardno':['',Validators.required],
      'nameoncard':['',Validators.required],
      'bookingId':['',Validators.required]
    })
  }

  loadData(bkid:any){
    this.api.getBookingDetails(bkid).subscribe({
      next:resp=>{
        this.data=resp
        this.balance=resp.billAmount-resp.advance
        this.myform.patchValue({amount:this.balance})
      }
    })
    this.api.getBookingPayments(bkid).subscribe({
      next:resp=>{
        this.payments=resp
      }
    })
  }

  paynow(values:any){
    console.log(values)
    if(this.myform.valid){
      this.api.savePayment(values).subscribe({
        next:resp=>{
          this.toast.success('Payment done')
          this.loadData(values.bookingId)
        },
        error:err=>{
          this.toast.error('Failed')
        }
      })
    }else{
      this.toast.error('Please fill all fields')
    }
  }
}
