import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASEURL:string=environment.apiUrl;
  loginUsername = new Subject<string>();
  public isLoggedIn: BehaviorSubject<boolean>;

  constructor(private http:HttpClient) { 
    this.isLoggedIn=new BehaviorSubject(false)
  }

  validate(data:any){
    return this.http.post<any>(this.BASEURL+"admin/validate",data);
  }

  registerUser(data:any){
    return this.http.post<any>(this.BASEURL+"customer",data);
  }

  getLoggedIn(){
    return this.isLoggedIn
  }

  getisloggedIn(){
    return sessionStorage.getItem('userid')!=null;
  }

  getLoggedInName(){
    return sessionStorage.getItem('uname')
  }

  getUserId(){
    return sessionStorage.getItem('userid')
  }

  loggedOut(){
    console.log('Cleared')
    sessionStorage.clear()
    this.isLoggedIn.complete()
    this.loginUsername.complete()
  }

  storeInfoToStorage(info:any){
    sessionStorage.setItem("userid",info.userid)
    sessionStorage.setItem("uname",info.uname)
    sessionStorage.setItem("role",info.role)
    this.loginUsername.next(info.uname);
    this.isLoggedIn.next(true);
  }

}
