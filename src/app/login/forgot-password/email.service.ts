import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ForgotPassword } from './forgot-password';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url: string = '/api';
  constructor(private httpClient: HttpClient) { }

  getEmail(userLoginEmailId : string): Observable<ForgotPassword> {
     return this.httpClient.post<ForgotPassword>(this.url+"/login/forgotpassword/confirmEmail", {userLoginEmailId});
   }
  }

