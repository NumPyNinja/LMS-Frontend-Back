import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../shared/utility.service';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  updateSession(session: Session) {
    throw new Error('Method not implemented.');
  }
  url: string = '/api'; //ttps://lms-phase2.herokuapp.com/lms/",
  constructor(private httpClient : HttpClient , private utilityService: UtilityService) { }
  getSessions(): Observable<Session[]> {
    return this.httpClient.get<Session[]>(this.url + "/allClasses"); 
  }
  editSession(session: Session) {
    const payload = {
      classTopic: session.classTopic,
      classStaffId: session.classStaffId,
      batchId:session.batchId,
      classNo:session.classNo,
      classDate:session.classDate,
      classDescription:session.classDescription,
      classComments:session.classComments,
      classNotes:session.classNotes,
      classRecordingPath:session.classRecordingPath,
      classStatus:session.classStatus

    };
    return this.httpClient.put<Session>(this.url + "/updateClass/" + session.csId, payload);
  
  }
  addSession(session: Session) :Observable<Session>{
    const payload = {
      classTopic: session.classTopic,
      classStaffId: session.classStaffId,
      batchId:session.batchId,
      classNo:session.classNo,
      classDate:session.classDate,
      classDescription:session.classDescription,
      classComments:session.classComments,
      classNotes:session.classNotes,
      classRecordingPath:session.classRecordingPath,
      classStatus:session.classStatus

    };
    return this.httpClient.post<Session>(this.url + "/CreateClassSchedule",payload)
    .pipe(
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.utilityService.getServerErrorMessage(error);
        }
        return throwError(errorMsg);
      }));;
    
  }
  deleteSession(session:Session) {
    return this.httpClient.delete<Session>(this.url + "/deleteByClass/" + session.csId);
  }

  getSessionListForStaffId(staffId : string): Observable<Session[]> {
    return this.httpClient.get<Session[]>(this.url + "/classesByStaff/" + staffId);
  }

  getSessionsByBatch(batchId: number): Observable<Session[]> {
    console.log("batch"+batchId);
    return this.httpClient.get<Session[]>(this.url + "/classesbyBatch/"+ batchId); 
  }
  
}
