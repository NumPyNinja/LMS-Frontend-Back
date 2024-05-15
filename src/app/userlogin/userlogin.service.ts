import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from './userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  url: string = '/api';//'https://lms-admin-rest-service.herokuapp.com/programs';
  

  constructor(private httpClient: HttpClient) { }

  getUserLogin(): Observable<UserLogin[]> {
    //return this.httpClient.get<Userlogin[]>('assets/Users.json')
    return this.httpClient.get<UserLogin[]>(this.url+"/login");
  }


}