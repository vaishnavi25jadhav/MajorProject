import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BkdetailsComponent } from './bkdetails/bkdetails.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CompaniesComponent } from './companies/companies.component';
import { ContactComponent } from './contact/contact.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { VariantsComponent } from './variants/variants.component';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'companies',component:CompaniesComponent},
  {path:'variants',component:VariantsComponent},
  {path:'customers',component:CustomersComponent},
  {path:'products',component:ProductsComponent},
  {path:'products/:id',component:ProductsComponent},
  {path:'details/:id',component:DetailsComponent},
  {path:'bookings',component:BookingsComponent},
  {path:'bkdetails/:id',component:BkdetailsComponent},
  {path:'mybookings',component:MybookingsComponent},
  {path:'reports',component:ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
