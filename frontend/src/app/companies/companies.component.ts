import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  fg:FormGroup
  companies:any[]
  constructor(private toast:ToastrService,private api:AdminService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.loadCompanies()
  }

  createForm(){
    this.fg=this.fb.group({
      'name':['',Validators.required]
    })
  }

  loadCompanies(){
    this.api.getAllCompanies().subscribe({
      next:resp=>this.companies=resp,
      error:err=>this.toast.error(err)
    })
  }

  deleteCompany(id:any){
    this.api.deleteCompany(id).subscribe({
      next:resp=>{
        this.toast.success(resp.msg)
        this.loadCompanies()
      },
      error:err=>{
        this.toast.error('Cannot delete company')
      }
    })
  }

  saveCompany(values:any){
    console.log(values,this.fg.valid)
    if(this.fg.valid){
      this.api.addCompany(values).subscribe({
        next:resp=>{
          this.toast.success(resp.msg)
          this.loadCompanies()
        },
        error:err=>this.toast.error(err)
      })
    }else{
      this.toast.error('Please fill required fields')
    }
  }

}
