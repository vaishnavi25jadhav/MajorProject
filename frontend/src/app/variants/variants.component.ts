import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css']
})
export class VariantsComponent implements OnInit {

  fg:FormGroup
  variants:any[]
  companies:any[]
  constructor(private api:AdminService,private toast:ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.loadData()
  }

  loadData(){
    this.api.getAllCompanies().subscribe({
      next:resp=>this.companies=resp,
      error:err=>this.toast.error(err)
    })

    this.api.getAllVariants().subscribe({
      next:resp=>this.variants=resp,
      error:err=>this.toast.error(err)
    })

  }

  createForm(){
    this.fg=this.fb.group({
      'name':['',Validators.required],
      'company':['',Validators.required],
      'price':['',Validators.required],
      'file':['',Validators.required],
      'pic':['',Validators.required]
    })
  }

  onFileChange(event:any) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fg.patchValue({
        pic: file
      });
    }
  }

  deleteVariant(id:number){
    this.api.deleteVariant(id).subscribe({
      next:resp=>{
        this.toast.success(resp.msg)
        this.loadData()
      },
      error:err=>{
        this.toast.error('Cannot delete variant')
      }
    })
  }

  saveVariant(){
    let formData=new FormData()
    console.log(this.fg)
    formData.append('name', this.fg.get('name').value);
    formData.append('companyid', this.fg.get('company').value);
    formData.append('price', this.fg.get('price').value);
    formData.append('pic', this.fg.get('pic').value);
    this.api.addVariant(formData)
    .subscribe({
      next:resp=>{
        this.toast.success(resp.msg)
        this.loadData()
        this.fg.reset()
    },
      error:err=>{
        this.toast.error('Error')
      }
  })
  }

}
