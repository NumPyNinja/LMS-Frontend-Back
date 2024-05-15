import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-staffdata',
  templateUrl: './staffdata.component.html',
  styleUrls: ['./staffdata.component.scss']
})
export class StaffdataComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'userId',
    'userFirstName',
    'userLastName',
    'userPhoneNumber',
  ];

  staffData: User[];
  public rowID: string;
  dialogRef: any;
  public selectedStaff: User;
  ActiveUser: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>();

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.userService.getAllActiveUsers().subscribe(List => {
      this.ActiveUser = List;})
     this.userService.getAllStaff().subscribe(us => {
      this.staffData = us;   
      var result = []
      this.staffData.forEach(item => {
        if(this.ActiveUser.find((y) => y.userId === item.userId)){
        let count = result.filter(x => x.userFirstName == item.userFirstName && x.userLastName == item.userLastName
          && x.userPhoneNumber == item.userPhoneNumber).length

        if (count == 0) {
          result.push(item)
        }
      }
      })

      this.dataSource.data = result;
    })
    
    
  }

  onRowClicked(templateRef, row) {
    this.rowID = row['userId'];
    this.selectedStaff = this.staffData.find((user) => user.userId == this.rowID);
    this.dialogRef = this.dialog.open(templateRef, {
      height: '650px',
      width: '800px',
    });
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
