import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = '/api';
  constructor(private httpClient: HttpClient) { }
  getLogin(): Observable<Login[]> {
    //return this.httpClient.get<Userlogin[]>('assets/Users.json')
    return this.httpClient.get<Login[]>(this.url+"/login");
  }
  // makeAuthenticatedRequest(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   let tokenstr ='Bearer '+token;

  //   // Create headers with Authorization token
  //   const headers = new HttpHeaders().set('Authorization', tokenstr);

  //   // Send the request with headers
  //   return this.httpClient.get('this.url', { headers,responseType:'text' as 'json' });
  // }
}
