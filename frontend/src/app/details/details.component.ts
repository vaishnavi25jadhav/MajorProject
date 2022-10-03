import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product:any
  base_URL=environment.baseURL
  isloggedIn:boolean
  totalamount:number
  fg:FormGroup
  today=moment().format('YYYY-MM-DD')
  constructor(private api:AdminService,
    private _route:Router,
    private auth:AuthService,
    private fb:FormBuilder,
    private toast:ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const prodid=this.route.snapshot.paramMap.get('id')
    console.log(prodid)
    this.createForm()
    console.log(this.today)
    this.isloggedIn= this.auth.getisloggedIn()
    this.api.getAllVariantDetails(prodid).subscribe({
      next:resp=>{
        this.product=resp
        this.totalamount=resp.price
        this.fg.patchValue({
          billamount:this.totalamount,
          userid:this.auth.getUserId(),
          variantid:parseInt(prodid)
        })
      },
      error:err=>this.toast.error(err)
    })

    this.fg.get('fromdate').valueChanges.subscribe(val=>{
      this.updateamount()
    })
    this.fg.get('todate').valueChanges.subscribe(val=>{
      this.updateamount()
    })
  }

  createForm(){
    this.fg=this.fb.group({
      'fromdate':[this.today,Validators.required],
      'todate':[this.today,Validators.required],
      'advance':['',Validators.required],
      'userid':['',Validators.required],
      'message':['',Validators.required],
      'cardno':['',Validators.required],
      'nameoncard':['',Validators.required],
      'billamount':['',Validators.required],
      'variantid':['',Validators.required]
    })
  }

  updateamount(){
    const from=this.fg.get('fromdate').value
    const to=this.fg.get('todate').value
    if(from && to){
      let fromdate=moment(from)
      let todate=moment(to)
      const days=todate.diff(fromdate,'days')
      if(days>=0){
        this.totalamount=(days+1)*(this.product.price)
        this.fg.patchValue({billamount:this.totalamount})        
      }else{
        this.toast.error('Invalid date range')
      }
    }
  }

  booknow(values:any){
    console.log(values,this.totalamount)
    if(this.fg.valid){
      console.log(values)
      this.api.saveBooking(values).subscribe({
        next:resp=>{
          this.toast.success(resp.msg)
          this._route.navigate(['/mybookings'])
        },
        error:err=>{
          console.log(err)
          this.toast.error('Failed')
        }
      })
    }else{
      this.toast.error('Please fill all required details')
    }
  }

}
