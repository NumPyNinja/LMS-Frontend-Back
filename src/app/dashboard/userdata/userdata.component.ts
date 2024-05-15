import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss'],
})
export class UserdataComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'userId',
    'userFirstName',
    'userLastName',
    'userPhoneNumber',
  ];




  userData: User[];
  public rowID: string;
  dialogRef: any;
  public selectedUser: User;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>();

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.userService.getAllUsers().subscribe(us => {
      this.userData = us;
      this.dataSource.data = us;

    })
  }

  onRowClicked(templateRef, row) {
    this.rowID = row['userId'];
    this.selectedUser = this.userData.find((user) => user.userId == this.rowID);
    console.log(this.selectedUser);
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
