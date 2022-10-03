import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  variants:any[]
  companies:any[]
  BASE_URL=environment.baseURL
  constructor(private api:AdminService,private _route:Router,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const cid = params.get('id');
        this.loadData(cid)
      }
    )
    
  }

  loadData(cid:any){
    console.log("id",cid)
    if(cid==null){
      this.api.getAllVariants().subscribe({
        next:resp=>{
          this.variants=resp
        }
      })
    }
    else{
      this.api.getCompanyVariants(cid).subscribe({
        next:resp=>{
          this.variants=resp
        }
      })
    }
    this.api.getAllCompanies().subscribe({
      next:resp=>{
        this.companies=resp
      }
    })
  }

}
