import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './user';
//import { UserProgBatch } from './user-prog-batch';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url: string = '/api';//'https://lms-admin-rest-service.herokuapp.com/programs';
  users: any;
  //staffList: User[];
   //result: User[]
   staffUList: Observable<User[]>

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    //return this.httpClient.get<any>('assets/Users.json')
    return this.httpClient.get<User[]>(this.url + "/users/roles");
  }

  getAllUsers(): Observable<User[]> {
    //return this.httpClient.get<any>('assets/Users.json')
    return this.httpClient.get<User[]>(this.url + "/users");
  }

  getAllActiveUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users/activeUsers");
  }
  addUser(userData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(this.url + '/users/roleStatus', userData, { headers });

  }

  getAllStaff(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users/roles/R02")
    
  }
  getAllStudents(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users/roles/R03")
    
  }
  getAllUsersByBatch(batchId : number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users/programBatch/" + batchId)
    
  }
  updateUser(user: User) {
    return this.httpClient.put<User>(this.url + "/users/" + user.userId ,user);
  }

  deleteUser(user:User) {
    return this.httpClient.delete<User>(this.url + "/users/" + user.userId);
  }
  
  assignProgBatch(pbData:any): Observable<any>{
    return this.httpClient.put<any>(this.url + "/users/roleProgramBatchStatus/" + pbData.userId, pbData );
  }
/*** ignore the below extra method  
assignProgBatchTemp(pbData:any): Observable<UserProgBatch>{
    return this.httpClient.put<UserProgBatch>(this.url + "/users/roleProgramBatchStatus/" + pbData.userId, pbData );
  }
  **/    
  getUserInfoById(Id:string): Observable<any>{
    return this.httpClient.get<any>(this.url + "/users/" + Id);
  }
  getAllUserSkills(): Observable<any>{
    return this.httpClient.get<any>(this.url + "/userSkill" );
  }
  getById(Id:string): Observable<any>{
    return this.httpClient.get<any>(this.url + "/userRoleProgramBatchMap/" + Id);
  }
  getAllUserRoleProgramBatchMap(): Observable<any>{
    return this.httpClient.get<any>(this.url + "/userRoleProgramBatchMap" );
  }
}