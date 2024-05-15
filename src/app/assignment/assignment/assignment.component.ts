import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { Assignment, AssignmentSelect, AssignmentSubmit, Staff1, UploadedAssignment } from '../assignment';
import { AssignmentService } from '../assignment.service';

import { Session } from 'src/app/session/session';
import { SessionService } from 'src/app/session/session.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  assignments: Assignment[];
  assignmentSize: number;
  selectedAssignments: Assignment[];
  visibility: boolean = false;
  assignment: Assignment;
  assigmentDialogue: boolean;
  selectedAssigment: Assignment[];
  submitted: boolean;
  assignmentSelectList: AssignmentSelect[] = [];
  selectedUploadAssignment: AssignmentSelect;
  inputFilePath: string = "";
  userId: string = "";
  subscription: Subscription;
  message1: Message[] = [];
  programList: Program[];
  batchList: Batch[];
  batchListTemp: Batch[];
  editMode = false;
  //programName: string;
 // batchName: string;
 // date:Date;
  pattername: boolean=false;
  patternDes: boolean=false;
  visibilityManage: boolean = false;
  assignmentsubmits: AssignmentSubmit[];
  assignmentsubmit: AssignmentSubmit;
  assignmentNameList:Assignment[]=[];
  userList: User[] = [];   
  classList:Session[];
  manageDialogue: boolean;
  userManage: AssignmentSubmit[];
  userServices: UserService[];
  assignsub: string[] = ['Yes','No'];
  today = new Date();
  staffList:User[];
  staffIDvaule:Staff1[]=[];
  addAssign:string;
  classListTemp: Session[];
  emptycheckCT:boolean;

  
  constructor(
    private assignmentService: AssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private programService: ProgramService,
    private batchService: BatchService,
    private userService: UserService,
    private sessionService:SessionService,
    private authService: AuthService) {
    {
      this.programService.getPrograms().subscribe(list => {
        this.programList = list;
      })
    }
    {
      this.sessionService.getSessions().subscribe(list => {
        this.classList = list;
        this.classListTemp=this.classList;
      })
    }
    {
      this.batchService.getBatchList().subscribe(list => {
        this.batchList = list;
        this.batchListTemp=this.batchList;
      })
    }
      {
      this.userService.getAllUsers().subscribe(
      user1List => { this.userList = user1List }
     )
}
{
  this.userService.getAllStaff().subscribe(
    staff1List => { this.staffList = staff1List })
}
{
      this.assignmentService.getAssignments().subscribe(
      assignmentName1List => { this.assignmentNameList = assignmentName1List }
    )
  }
}
  ngOnInit(): void {
    this.getAssignmentList();
    this.subscription = this.authService.loggedInUserId.subscribe((res) => {
      this.userId = res;
    });
 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngDoCheck() {
    this.addAssign=sessionStorage.getItem('AddAssign1');
   if(this.addAssign=='true'){
   sessionStorage.removeItem("AddAssign1");
    this.openNew();
  }
   }


  private getMaxAssignmentId(max: number) {
    this.assignments.forEach((character) => {
      let assignmentSelectOption: AssignmentSelect = {};
      assignmentSelectOption.assignmentName = character.assignmentName;
      assignmentSelectOption.assignmentId = character.assignmentId;
      this.assignmentSelectList.push(assignmentSelectOption);
      const tempAssignmentId = Number(character.assignmentId);

      if (tempAssignmentId > max) {
        max = tempAssignmentId;
      }
    });
    return max;
  }
//Staff name = FirstName + Last Name Dropdown
staffIDFunction(){
  this.staffList.forEach(item => {
  if(this.staffIDvaule.filter(x => x.userId == item.userId).length == 0) {
    this.staffIDvaule.push({userId:item.userId,staffName:item.userFirstName+" "+item.userLastName});
  }
});
}
//find staff Name by Staff ID
  findStaffName(staffId: string) {
    var nameUser: String;
    var userdet: User = {};
    if (this.userList.length != 0) {
      userdet = this.userList.find(y => y.userId == staffId);
      nameUser = userdet.userFirstName + '  ' + userdet.userLastName;
      return nameUser;
    }
  }
  //add a new assignment 
  openNew() {
    this.editMode=false;
    this.assignment = {};
    this.staffIDFunction();
    this.submitted = false;
    this.assigmentDialogue = true;
  }
  //open a Manage assignment Grade 

openManage(assignId:number) {
	    
	  this.getAssignmentsSubmit(assignId);
      this.assignmentsubmit= {};
      this.manageDialogue = true;
        }
private getAssignmentsSubmit(assignId) {
	
      this.assignmentService.getAssignmentSubmit(assignId).subscribe((res) => {
      this.assignmentsubmit= res;
    });
   
  }
   private getAssignmentSubmitList() {
    this.assignmentService.getAssignmentsSubmitList().subscribe((res) => {
      this.assignmentsubmits = res;
      //this.assignmentSize = this.getMaxAssignmentId(0);
    });    
  }
  findStudentName(studentId: string) {
	  var userdet: User = {};
      var nameUser: String;
      if(userdet = this.userList.find(x => x.userId == studentId)){
      nameUser = userdet.userFirstName + '  ' +userdet.userLastName;
      return nameUser;
      }
      else{
      return nameUser="";
      }
  }
    findAssignName(AssignNameId: number) {
	  var AssignName: Assignment = {};
      var Assignmentname: string;
     if(AssignName = this.assignmentNameList.find(y => Number(y.assignmentId) == AssignNameId)){
      Assignmentname = AssignName.assignmentName;
      return Assignmentname; 
	 }
     else 
      return Assignmentname="";  

  }
  
 private getAssignmentList() {
      this.visibility = true;
      this.assignmentService.getAssignments().subscribe((res) => {
      this.assignments = res;
      this.assignmentSize = this.getMaxAssignmentId(0);
      this.visibility = false;
    });
  }
//pattern validation for Assignment Name
patternDesc()
{
	 const pattern=/^[a-zA-Z][a-zA-Z0-9 -_]{3,25}.*/;
     if(!pattern.test(this.assignment.assignmentDescription)){
		  this.patternDes=true;
		 return true;
	 } 
	 else{
	  this.patternDes=false;
	    return false;}
}
//pattern validation for Assignment Description
patternName()
{
	 const pattern=/^[a-zA-Z][a-zA-Z0-9 ]{3,25}$/;
     if(!pattern.test(this.assignment.assignmentName)){
		 this.pattername=true;
		 return true;
	 }
	 else{
	    this.pattername=false;
	    return false;}
}

  //save an assigment
  saveAssignment() {
    this.submitted = true;
   // const atd: any = this.assignment.batchName;
  //  this.assignment.batchId = atd.batchId;
   // const att: any = this.assignment.programName;
    //this.assignment.programId = att.programId;
    if(this.assignment.batchName && this.assignment.programName && this.assignment.classTopic && this.assignment.dueDate && this.assignment.staffName && !this.pattername && !this.patternDes) {
    if (this.assignment.assignmentName.trim()) {
      if (this.assignment.assignmentId) { // in Edit
        delete this.assignment.batchName;
        delete this.assignment.programName;
        delete this.assignment.classTopic;
        const user: any = this.assignment.staffName;
        if(user.userId){
        this.assignment.graderId = user.userId;
        this.assignment.createdBy = user.userId;
        }
        delete this.assignment.staffName;
        this.assignmentService.updateAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Assignment Updated',
            life: 2000,
          });
        });
      } else { //create new Assignment
          const assignBname : any = this.assignment.batchName;
          this.assignment.batchId = assignBname.batchId;
          const assigncTopic: any = this.assignment.classTopic;
          this.assignment.csId = assigncTopic.csId;
          const user: any = this.assignment.staffName;
          this.assignment.graderId = user.userId;
          this.assignment.createdBy = user.userId;
          delete this.assignment.staffName;
          delete this.assignment.batchName;
          delete this.assignment.programName;
          delete this.assignment.classTopic;
       // this.assignmentSize = this.assignmentSize + 1;
       //this.assignment.batchId = this.assignmentSize;
       // this.assignment.graderId = this.userId;
       // this.assignment.programName = att.programName;
       // this.assignment.batchName = atd.batchName
        this.assignmentService.saveAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Assignment created',
            life: 2000,
          });
        });
      }
      this.assignments = [...this.assignments];
      this.assigmentDialogue = false;
      this.assignment = {};
    }
    }

  }
  hideDialog() {
    this.assigmentDialogue = false;
    this.submitted = false;
  }

  deleteAssigment(assigment: Assignment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + assigment.assignmentName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assignments = this.assignments.filter((val) => val.assignmentId !== assigment.assignmentId);
        this.assignmentService.delete(assigment).subscribe(response => {
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Assignment Deleted',
          life: 2000,
        });
      },
    });
  }

  deleteSelectedAssignments(){
    this.confirmationService.confirm({

      message: 'Are you sure you want to delete the selected assignmets?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assignments = this.assignments.filter((val) => !this.selectedAssignments.includes(val));
        this.selectedAssignments.forEach((value)=>(
          this.assignmentService.delete(value).subscribe(response => {  
            this.selectedAssignments = null;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Assignments Deleted',
              life: 3000,
            });
          })  
        )) ;
      },
    });
  }

  editAssignment(assigment: Assignment) {
    this.editMode = true;
    this.emptycheckCT=true;
    this.assigmentDialogue = true;
    this.assignment = { ...assigment };
    this.staffIDFunction();
    if(this.assignment.graderId){
      this.assignment.staffName=this.findStaffName(this.assignment.graderId);}
      else
      this.assignment.staffName="";
   // this.batchList=this.batchListTemp;
    this.assignment.dueDate = new Date(this.assignment.dueDate);
   

    const batchName = this.batchListTemp.find(x => x.batchId == this.assignment.batchId);
    this.assignment.batchName=batchName.batchName;
    const programId =batchName.programId;

    const programName = this.programList.find(x => x.programId == programId);
    this.assignment.programName=programName.programName;

    const classTopic = this.classListTemp.find(x => x.csId == this.assignment.csId);
    this.assignment.classTopic=classTopic.classTopic;
    //this.getBatchName(this.assignment.batchId);
  
  }

  getBatchName(batchId : number){
    for (const batch of this.batchList) {
      if (batch.batchId === batchId) {
        this.assignment.programName=batch.programName;
          this.assignment.batchName= batch.batchName;
          return; 
      }
    }
  }
//Based on the  program Batch dropdown list is populate
  updateFilteredBatchNames(){
    this.batchList = this.batchListTemp;
    const progData :any = this.assignment.programName;
    const pid :any=progData.programId;
    this.batchList = this.batchList.filter(item => item.programId === pid);
  }
  //Based on the Batch, class topic dropdown list is populate
  updateFilteredClassTopic(){
    this.classList = this.classListTemp;
    const batchData :any = this.assignment.batchName;
    const bid :any=batchData.batchId;
    this.classList = this.classList.filter(item => item.batchId === bid);
  }
  findBatchName(batchId: number) {
    if (this.batchList.length != 0 && batchId != null) {
      return this.batchList.filter(x => x.batchId == batchId)[0].batchName;
    }else
    return "";
  }

  findClassTopic(csId: any) {
    if (this.classListTemp.length != 0 && csId != null) {
      return this.classListTemp.filter(x => x.csId == csId)[0].classTopic ;
    }else
      return "";
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.assignments.length; i++) {
      if (this.assignments[i].assignmentId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  // upload Assigment button

  displayUploadAssignmentDialog: boolean = false;

  showDialog() {
    this.displayUploadAssignmentDialog = true;
  }

  closePopup() {
    this.displayUploadAssignmentDialog = false;
  }

  uploadAssignment() {
    const uploadedAssignment: UploadedAssignment = {
      //filePath: this.inputFilePath,
      assignmentId: this.selectedUploadAssignment.assignmentId,
      //uploadDate: new Date(),
      //uploadUser: this.userId
    };
    this.assignmentService.uploadAssignments(uploadedAssignment).subscribe((res) => {
      this.inputFilePath = "";
      this.selectedUploadAssignment = undefined;
      this.closePopup();
      this.message1 = [
        { severity: 'success', summary: 'Filepath Uploaded Successfully', detail: '' }];
    });
  }

}

function hideDialog() {
  throw new Error('Function not implemented.');
}

