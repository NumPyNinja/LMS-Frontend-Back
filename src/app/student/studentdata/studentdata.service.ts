import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/assignment/assignment';
import { Session } from 'src/app/session/session';
import { UserRoleProgramBatch } from 'src/app/user/user-role-program-batch';

@Injectable({
  providedIn: 'root'
})
export class StudentdataService {
  url: string = '/api';
  constructor(private httpClient: HttpClient) { }
  getAllMissingAssignment(userId:string): Observable<any> {
    return this.httpClient.get<Assignment[]>(this.url + "/assignments/studentAssignment/"+userId);
  }
  getProgramBatchForUser(userId:string): Observable<any> {
    console.log(userId);
    return this.httpClient.get<Number>(this.url + "/users/user/"+userId);
  }
  getAllUpcomingComingClassesForStudent(userId:string): Observable<any> {
    return this.httpClient.get<Session[]>(this.url + "/upcomingClasses/"+userId);
  }
}
