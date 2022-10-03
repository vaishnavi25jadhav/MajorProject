import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers=[]
  constructor(private api:AdminService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.api.getAllCustomers().subscribe({
      next:resp=>{
        this.customers=resp
      },
      error:err=>{
        console.log(err)
      }
    })
  }
}
