import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { ClassService } from 'src/app/class/class.service';
import { Class } from 'src/app/class/class';
import { SessionService } from 'src/app/session/session.service';
import { Session } from 'src/app/session/session';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-classesforstaff',
  templateUrl: './classesforstaff.component.html',
  styleUrls: ['./classesforstaff.component.scss']
})
export class ClassesforstaffComponent implements OnInit {

  displayedColumns: string[] = [
    
    'classTopic',
    'batchName',
    'classNo',
    'classDate'

  ];

  classData: Session[];
  public rowID: string;
  dialogRef: any;
  public selectedClass: Session;
  datePipe: DatePipe = new DatePipe('en-US');
  loggedInUserDbId : string;
  userDBId:string="";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Session>();

  constructor(private dialog: MatDialog, private sessionService: SessionService, private authService:AuthService) {
    
    this.authService.loggedInUserDbId.subscribe((res) => this.userDBId=res);

    this.sessionService.getSessionListForStaffId(this.userDBId).subscribe(us => {
      this.classData = us;
     
      this.dataSource.data  = us;
    });

        
   
  }

  getFormattedDate(){
    
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformDate;

  }

 

  onCloseDialog() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
  }
}


