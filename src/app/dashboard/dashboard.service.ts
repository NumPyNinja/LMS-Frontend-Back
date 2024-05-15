import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = '/api';//'https://lms-admin-rest-service.herokuapp.com/programs';
  // public staffData :User[]
  
  constructor(private httpClient: HttpClient) { }

   getAllProgramsWithUsers() {
    return this.httpClient.get(this.url + "//allProgramsWithUsers"); ///https://lms-phase2.herokuapp.com/lms/putprogram/1
  }

  getActiveInActiveUsers() {
    return this.httpClient.get(this.url + "//users/byStatus"); ///https://lms-phase2.herokuapp.com/lms/putprogram/1
  }


}