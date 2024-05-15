import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { StudentdataService } from './studentdata.service';
import { UserRoleProgramBatch } from 'src/app/user/user-role-program-batch';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.scss']
})
export class StudentdataComponent implements OnInit {
  users:User[];
  userEmailId: string = "";
  userId:string;
  batchId:number;
  //userRoleMapProgramBatch:UserRoleProgramBatch[];
  constructor(private userService:UserService,private authService:AuthService,private studentDataService:StudentdataService) { }

  ngOnInit(): void {
    this.authService.loggedInUserId.subscribe((res) => {
      this.userEmailId = res;
    });
    
    this.userService.getAllUsers().subscribe((data)=>{
      this.users = data;
      console.log(this.users);
      const userWithEmail = this.users.find(user => user.userLoginEmail === this.userEmailId);
      this.userId=userWithEmail.userId;
      this.studentDataService.getProgramBatchForUser(this.userId).subscribe((data)=>{
        this.batchId=data;
        })
     });
     }
  }