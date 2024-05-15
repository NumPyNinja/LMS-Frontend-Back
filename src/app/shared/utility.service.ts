import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        let lmsError = error.error;
        if (lmsError.errorCode) {
          return lmsError.errorMessage;
        } else
          if (lmsError.success !== null && lmsError.success === false) {
            return lmsError.message
          }
          else {
            return `Bad Request: ${error.message}`;
          }
      }
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
