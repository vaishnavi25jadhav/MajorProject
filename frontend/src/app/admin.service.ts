import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASEURL:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getAllCustomers(){
    return this.http.get<any[]>(this.BASEURL+'Customer');
  }

  addCompany(data:any){
    return this.http.post<any>(this.BASEURL+'Company',data);
  }

  getAllCompanies(){
    return this.http.get<any[]>(this.BASEURL+'Company');
  }

  deleteCompany(id:number){
    return this.http.delete<any>(this.BASEURL+'Company/'+id);
  }

  addVariant(data:any){
    return this.http.post<any>(this.BASEURL+'Variant',data);
  }

  getAllVariants(){
    return this.http.get<any[]>(this.BASEURL+'Variant');
  }
  getCompanyVariants(cmpid:any){
    return this.http.get<any[]>(this.BASEURL+'Variant?cmpid='+cmpid);
  }

  getAllVariantDetails(id){
    return this.http.get<any>(this.BASEURL+'Variant/'+id);
  }

  deleteVariant(id:number){
    return this.http.delete<any>(this.BASEURL+'Variant/'+id);
  }

  saveBooking(data:any){
    return this.http.post<any>(this.BASEURL+'Booking',data);
  }
  
  savePayment(data:any){
    return this.http.post<any>(this.BASEURL+'Booking/payment',data);
  }

  getAllBookings(){
    return this.http.get<any[]>(this.BASEURL+'Booking');
  }

  getBookingDetails(id:any){
    return this.http.get<any>(this.BASEURL+'Booking/'+id);
  }

  getUserBookings(userid:string){
    return this.http.get<any[]>(this.BASEURL+'Booking/users?userid='+userid);
  }

  updateStatus(id: number,status:string){
    return this.http.put<any>(this.BASEURL+'Booking/'+id,{status});
  }

  getReport(){
    return this.http.get<any[]>(this.BASEURL+'Booking/report');
  }

  getBookingPayments(id:any){
    return this.http.get<any[]>(this.BASEURL+'Booking/payments/'+id);
  }
}
