import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted=false;
  fg: FormGroup;

  constructor(private fb:FormBuilder,
    private auth:AuthService,
    private _router:Router,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.fg=this.fb.group({
      'name':['',Validators.required],
      'gender':['',Validators.required],
      'phone':['',Validators.required],
      'userid':['',Validators.required],
      'pwd':['',Validators.required],
      'city':['',Validators.required]
    })
  }

  register(values:any){
    console.log(values,this.fg.valid)
    this.submitted=true;
    if(this.fg.valid){
      console.log(values)
      this.auth.registerUser(values).subscribe({
        next:resp=>{
          this.toast.success(resp.msg)
          this._router.navigate([''])          
        },
        error:err=>{
          console.log(err)
          this.toast.error(err.error,"Error")
        }
      })      
    }
  }

}
