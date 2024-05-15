import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../login/login';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  url: string = '/api'
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedInUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  loggedInUserId = this.loggedInUserSubject.asObservable();
  public loggedInUserSubjectRole: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public loggedInUserDBID: BehaviorSubject<string> = new BehaviorSubject<string>("");
  

  

get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

get loggedInUserRole(){
 return this.loggedInUserSubjectRole.asObservable();
}

get loggedInUserDbId(){
  return this.loggedInUserDBID.asObservable();
 }

 

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  /**
  
  login(login: Login) {
    this.http.post<any>(this.url+'/login', login).subscribe(
      (response) => {
        const token = response.token;
        this.loggedIn.next(true);
        this.loggedInUserSubject.next(login.userLoginEmailId);
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      },
      (error) => {
        // Handle login error
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }
    );
  }

  * */

  login(login: Login) {
    return this.http.post<any>(this.url+'/login', login)
    .pipe(map(response => {
        const token = response.token;
        this.loggedIn.next(true);
        this.loggedInUserSubject.next(login.userLoginEmailId);
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
        this.loggedInUserSubjectRole.next(response.roles);
        this.loggedInUserDBID.next( response.userId);

      },
      (error) => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }));
  }


  
  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   console.log(token);
  //   return token !== null;
  // }
  resetPassword(resetDto: Login, token: any): Observable<any> {
  
    console.log("this.token3");
    console.log(token);

    console.log("local storage token3");
    console.log(localStorage.getItem('token'));
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token, 
      'Content-Type': 'application/json' 
    });
    const newPasswordJson = typeof resetDto === 'object' ? JSON.stringify(resetDto) : resetDto;
    return this.http.post(this.url+'/resetPassowrd',newPasswordJson,{ headers: headers });
  }
 
  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
