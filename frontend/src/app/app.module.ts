import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsernavComponent } from './usernav/usernav.component';
import { AdminnavComponent } from './adminnav/adminnav.component';
import { ProductsComponent } from './products/products.component';
import { CompaniesComponent } from './companies/companies.component';
import { VariantsComponent } from './variants/variants.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { CustomersComponent } from './customers/customers.component';
import { BookingsComponent } from './bookings/bookings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { AdminService } from './admin.service';
import { AuthGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { ReportComponent } from './report/report.component';
import { BkdetailsComponent } from './bkdetails/bkdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UsernavComponent,
    AdminnavComponent,
    ProductsComponent,
    CompaniesComponent,
    VariantsComponent,
    MybookingsComponent,
    CustomersComponent,
    BookingsComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    DetailsComponent,
    ReportComponent,
    BkdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard,AuthService,CustomerService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
