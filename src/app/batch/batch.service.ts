import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../shared/utility.service';
import { Batch } from './batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  url: string = '/api';
  batchList: Batch[];

  constructor(private httpClient: HttpClient,
    private utilityService: UtilityService) { }

  getBatchList(): Observable<Batch[]> {
   // return this.httpClient.get<Batch[]>('assets/Batch.json');
   return this.httpClient.get<Batch[]>(this.url + "/batches");
  }

  addBatch(batch: Batch): Observable<Batch> {
    return this.httpClient.post<Batch>(this.url + "/batches", batch)
    .pipe(
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.utilityService.getServerErrorMessage(error);
        }
        return throwError(errorMsg);
      }));
}

  updateBatch(batch: Batch) {
    return this.httpClient.put<Batch>(this.url + "/batches/" + batch.batchId, batch);
  }

  deleteBatch(batch: Batch) {
    return this.httpClient.delete<Batch>(this.url + "/batches/" + batch.batchId);
  }

}
