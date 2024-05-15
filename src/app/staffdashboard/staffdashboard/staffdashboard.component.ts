import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SessionService } from 'src/app/session/session.service';

@Component({
  selector: 'app-staffdashboard',
  templateUrl: './staffdashboard.component.html',
  styleUrls: ['./staffdashboard.component.scss']
})
export class StaffdashboardComponent implements OnInit {

  userDbId: string = "";
 
  userRole:string="";

  userEmailId:string="";

  noOfClasses:Number=0;
  
 
  constructor(private authService: AuthService, private sessionService:SessionService) { }

  ngOnInit(): void {
    this.authService.loggedInUserDBID.subscribe((res) => {
      this.userDbId = res;
    });

    this.authService.loggedInUserId.subscribe((res) => {
      this.userEmailId = res;
    }); 
   
  this.authService.loggedInUserRole.subscribe((data:any) =>   this.userRole =  data[0].slice(5));
  
  this.sessionService.getSessionListForStaffId(this.userDbId).subscribe(us => {
    this.noOfClasses = us.length;
   
  });
  }

}
