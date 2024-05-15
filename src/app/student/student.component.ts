import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Assignment, AssignmentSelect, UploadedAssignment } from '../assignment/assignment';
import { AssignmentService } from '../assignment/assignment.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';
import { StudentdataService } from './studentdata/studentdata.service';
import { AuthService } from '../auth/auth.service';
import { Session } from '../session/session';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {


  inputFilePath: string = "";
  selectedUploadAssignment: AssignmentSelect;
  message1: Message[] = [];
  studentuserId: string = "";
  userEmailId: string = "";
  assignmentSelectList: AssignmentSelect[] = [];
  visibility: boolean = false;
  users: User[];
  selectedUsers: User[];
  user: User;
  batchList: Batch[];
  batch : Batch;
  getBatchList: Batch[];
  first: number;
  assignment: Assignment[];
  class:Session[];
  userRole:  string="";
  userName:string;
  subDesc: string;
  subComments: string;
  subPathAttach1: string;
  

  constructor(
    private authService:AuthService,
    private studentDataService:StudentdataService,
    private userService: UserService,
    private batchService: BatchService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe((data)=>{
      this.users = data;
    });
    this.batchService.getBatchList().subscribe((data)=>{
      this.batchList = data;
      console.log(this.batchList);
    });
    this.authService.loggedInUserId.subscribe((res) => {
      this.userEmailId = res;
    });
    this.authService.loggedInUserRole.subscribe((data: any) => 

      this.userRole =   data[0].slice(5)); 
    this.userService.getAllUsers().subscribe((data)=>{
      this.users = data;
      const userWithEmail = this.users.find(user => user.userLoginEmail === this.userEmailId);
      this.studentuserId=userWithEmail.userId;
      this.userName=userWithEmail.userFirstName+" "+userWithEmail.userLastName;
      this.getMissingAssignments();
      this.getAllUpcomingClasses();
     });
     this.getAssignmentList();
  
  }
  getAllUpcomingClasses() {
    this.studentDataService.getAllUpcomingComingClassesForStudent(this.studentuserId).subscribe((classData)=>{
    this.class=classData;
    })
  }
  getMissingAssignments() {
    this.studentDataService.getAllMissingAssignment(this.studentuserId).subscribe((assignmentData) => {
      this.assignment = assignmentData;
    });
  }



  // upload Assigment button

  displayUploadAssignmentDialog: boolean = false;

  showDialog() {
    this.displayUploadAssignmentDialog = true;
  }

  closePopup() {
    this.displayUploadAssignmentDialog = false;
  }
  private getAssignmentList() {
    this.visibility = true;
    this.assignmentService.getAssignments().subscribe((res) => {
    this.assignment = res;
    this.assignmentSelectList = res.map((assignment) => {
      return {
          assignmentId: assignment.assignmentId,
          assignmentName: assignment.assignmentName
      };
  });
    this.visibility = false;
  });
}

  uploadAssignment() {
     const uploadedAssignment: UploadedAssignment = {
      subPathAttach1: this.subPathAttach1,
      assignmentId: this.selectedUploadAssignment.assignmentId,
      userId: this.studentuserId,
      subDesc:this.subDesc,
      subComments: this.subComments
    };
    this.assignmentService.uploadAssignments(uploadedAssignment).subscribe((res) => {
      this.subPathAttach1= "";
      this.selectedUploadAssignment = undefined;
      this.closePopup();
      
    });
  }

}


