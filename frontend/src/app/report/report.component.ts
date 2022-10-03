import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  payments:any[]
  constructor(private api:AdminService) { }

  ngOnInit(): void {
    this.api.getReport().subscribe({
      next:resp=>{
        this.payments=resp
      }
    })
  }

}
