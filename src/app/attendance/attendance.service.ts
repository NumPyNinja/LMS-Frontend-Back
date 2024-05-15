import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from './attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  url: string = '/api';

  constructor(private httpClient: HttpClient) { }

  getAttendanceList(): Observable<Attendance[]> {
   return this.httpClient.get<Attendance[]>(this.url+"/attendance");
  }

  addAttendance(attendance: Attendance): Observable<Attendance> {
    return this.httpClient.post<Attendance>(this.url + "/attendance", attendance);
  }

  updateAttendance(attendance: Attendance) {
    return this.httpClient.put<Attendance>(this.url + "/attendance/" + attendance.attId, attendance);
  }

  delete(attendance: Attendance) {
    return this.httpClient.delete<string>(this.url + "/attendance/" + attendance.attId);
  }

}