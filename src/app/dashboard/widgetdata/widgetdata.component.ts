import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { UserService } from 'src/app/user/user.service';
import { BatchService } from 'src/app/batch/batch.service';
import { ProgramService } from 'src/app/program/program.service';

@Component({
  selector: 'app-widgetdata',
  templateUrl: './widgetdata.component.html',
  styleUrls: ['./widgetdata.component.scss'],
  //providers: [DashboardService]
})
export class WidgetdataComponent implements OnInit {

  allUserC: number;
  allBatchC: number;
  allProgramC: number;
  allStaffC:  number;

  constructor( private userService: UserService,
    private batchService: BatchService,
    private programService: ProgramService,
    private dashboardService : DashboardService) {

    this.userService.getAllUsers().subscribe(allU => {
      this.allUserC = allU.length;
    })

    this.userService.getAllStaff().subscribe(allS => {
              var result = []
              allS.forEach(item => {
          let count = result.filter(x => x.userFirstName == item.userFirstName && x.userLastName == item.userLastName
            && x.userPhoneNumber == item.userPhoneNumber).length
  
          if (count == 0) {
            result.push(item)
          }
        })
  
        this.allStaffC = result.length;
     
    })

    this.batchService.getBatchList().subscribe(allB => {
      this.allBatchC = allB.length;
    })

    this.programService.getPrograms().subscribe(allP => {
      this.allProgramC = allP.length;
    })
  }

  ngOnInit(): void {
  }

}


