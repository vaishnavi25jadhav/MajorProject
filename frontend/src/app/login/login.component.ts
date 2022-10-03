import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      'userid':['',Validators.required],
      'pwd':['',Validators.required],
      'role':['',Validators.required],
    })
  }

  validate(values:any){
    this.submitted=true;
    if(this.fg.valid){
      console.log(values)
      this.auth.validate(values).subscribe({
        next:resp=>{
        console.log(resp)
        this.toast.success('Welcome '+resp.uname,"Login Successful")
        this.auth.storeInfoToStorage(resp)
        if(resp.role === "Admin")
          this._router.navigate(['dashboard'])        
        else
          this._router.navigate([''])
        },
        error:err=>{
          console.log(err)
          this.toast.error('Invalid userid or password',"Login Failed")
        }
      })
    }
  } 

}
