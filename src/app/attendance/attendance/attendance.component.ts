import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { Session } from 'src/app/session/session';
import { SessionService } from 'src/app/session/session.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Attendance } from '../attendance';
import { AttendanceService } from '../attendance.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';
import { StudentComponent } from 'src/app/student/student.component';
import { kStringMaxLength } from 'buffer';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
 // selectedCountries: any[];
  attendances: Attendance[];
  tempAttendances: Attendance[];
  attendanceSize: number;
  studentName:string;
  selectedAttendances: Attendance[];
  visibility: boolean = false;
  attendance: Attendance;
  att:Attendance[];
  attendanceDialogue: boolean;
  allAttendanceDialogue: boolean;
  editAttendanceDialogue: boolean;
  selectedAttendance: Attendance[];
  submitted: boolean;
  batchList: Batch[];
  selectedBatch: Batch;
  sessionList: Session[];
  selectedClass: Session;
  selectedCls: Session;
  selectedStudents: User[];
  users: User[];
  attendanceDrop: string[]=['Present','Absent','Late','Excused'];
  selectedDrop:string[];
  selectedDate: Date;
  AttendaceDateList: Date[] = [];
  maxDate : Date;  
  minDate = new Date();
  students: User[];
  addAttendace:string;

  constructor(
    private attendanceService: AttendanceService,
    private messageService: MessageService,
    private batchService: BatchService,
    private confirmationService: ConfirmationService,
    private sessionService:SessionService,
    private userService: UserService) {
   
  }


  ngOnInit(): void {
    
    this.batchService.getBatchList().subscribe(list => {
      this.batchList = list;
    })

    this.userService.getAllUsers().subscribe(
     userList2=>{
      this.users=userList2;
    })

    this.sessionService.getSessions().subscribe(res=>{
      this.sessionList=res;
      this.getAttendanceList(); 
    })
  
    this.maxDate = new Date();
    this.minDate.setDate(this.maxDate.getDate() - 6); 
  }
  
  ngDoCheck() {
    this.addAttendace=sessionStorage.getItem('AddAttendance1');
    if(this.addAttendace=='true'){
     sessionStorage.removeItem("AddAttendance1");
     this.openNew();
    }
  }
  private getAttendanceList() {
    this.visibility = true;

    this.attendanceService.getAttendanceList().subscribe((res) => { 

      this.attendances = res;
      const result = [];
      const map = new Map();
      for (const item of this.attendances) {
          if(!map.has(item.csId) || !map.has(item.batchId)){
            // set any value to Map
              map.set(item.attId, true);    
              map.set(item.csId, true);    
              map.set(item.batchId, true);  
              map.set(item.attendance, true);  
              map.set(item.attendanceDate, true);  
              map.set(item.studentId, true);  
              result.push({
                attId: item.attId,
                csName: item.csName,
                csId: item.csId,
                batchName: item.batchName,
                batchId: item.batchId,
                attendance: item.attendance,
                attendanceDate: item.attendanceDate,
                studentId: item.studentId
              });
          }
        }
      this.attendances = result;

      for (let index = 0; index < this.attendances.length; index++) {
        
        const student = this.users.find(student => student.userId == this.attendances[index].studentId);
        if (student != null)  this.attendances[index].studentName = student.userFirstName;
      
        const cls = this.sessionList.find(cls => cls.csId == this.attendances[index].csId);
        if (cls != null)  this.attendances[index].csName = cls.classTopic;

        const batch = this.batchList.find(batch => batch.batchId == cls.batchId);
        if (batch != null)  {
          this.attendances[index].batchId = batch.batchId.toString();
          this.attendances[index].batchName = batch.batchName;
      }   
      console.log('Backend data' + this.attendances)
      this.attendanceSize = this.getMaxAttendanceId(0);
      this.visibility = false;
    }});
  }

  private getMaxAttendanceId(max: number) {
    this.attendances.forEach((character) => {
      const tempAttendanceId = Number(character.attId);

      if (tempAttendanceId > max) {
        max = tempAttendanceId;
      }
    });
    return max;
  }
 
  //add a new attendance 
  async openNew() {
    this.attendance = {};
    this.submitted = false;
    this.attendanceDialogue = true;
    
    //await this.classService.getClassList().subscribe(res => {
     // this.classList = res;
    //})
    this.sessionService.getSessions().subscribe(res=>{
      this.sessionList=res
    })

     this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    })

  }

  openNewAttendances(){
    this.attendance = {};
    this.submitted = false;
    this.allAttendanceDialogue = true;
  }

  hideDialog() {
    this.attendanceDialogue = false;
    this.editAttendanceDialogue = false;
    this.allAttendanceDialogue = false;
    this.submitted = false;
    this.selectedStudents = null;
    this.selectedBatch = null;
    this.selectedClass = null;
    this.selectedDate = null;
    this.selectedDrop = null;         
    this.AttendaceDateList = [];
    this.ngOnInit();
  }

  hideEditDialog(){
    this.editAttendanceDialogue = false;
  }

  //save an attendance 
  saveAttendance() {
   if(this.editAttendanceDialogue==true){
    
    let editedAttendance: Attendance = {};
    editedAttendance.attId=this.attendance.attId;
    editedAttendance.csId = this.attendance.csId;
    editedAttendance.studentId = this.attendance.studentId;
    editedAttendance.attendance = this.attendance.attendance;
    editedAttendance.attendanceDate=this.attendance.attendanceDate;
    this.attendanceService.updateAttendance(editedAttendance).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'attendances updated',
        life: 3000,
      });
    }, err => {
      this.messageService.add({
        severity: 'failure',
        summary: 'Failed',
        detail: 'Attendance updation failed',
        life: 3000,
      });
    });   
    this.editAttendanceDialogue = false;   
    this.getAttendaceListByClass(editedAttendance.csId); 
  }
   else {
    this.submitted = true;
    //checking attendance already exist or not
    for (let index = 0; index < this.selectedStudents.length; index++) {
      const newStudent = this.selectedStudents[index];      
        const newClass = this.selectedClass;
        const newAttendenceDate = this.selectedDate;
        let attendance = this.attendances.findIndex(att => att.csId === newClass.csId && att.studentId === newStudent.userId &&  att.attendanceDate === newAttendenceDate);     

        if(attendance != -1){
          alert('Cannot add. Attendance already exist');
        } else {            
              this.selectedStudents.forEach((selectedStudent) => {
                let attendance: Attendance = {};
                attendance.csId = this.selectedClass.csId;
                attendance.studentId = selectedStudent.userId;
                attendance.attendance = this.selectedDrop.toString();
                attendance.attendanceDate = this.selectedDate;
                this.attendanceService.addAttendance(attendance).subscribe((res) => {          
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'new attendances created',
                    life: 3000,
                  });
                }, err => {
                  this.messageService.add({
                    severity: 'failure',
                    summary: 'Failed',
                    detail: 'Attendance creation failed',
                    life: 3000,
                  });
                });
              });  
              
        
            this.ngOnInit();
            this.attendanceDialogue = false;  
            this.selectedStudents = null;
            this.selectedBatch = null;
            this.selectedClass = null;
            this.selectedDate = null;
            this.selectedDrop = null;
          }
      }}    
      this.selectedAttendances = null;
      
  }
  
  //delete
  deleteAttendance(attendance: Attendance) {
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + attendance.attId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       
        this.attendances = this.tempAttendances.filter((val) => val.attId !== attendance.attId);

        this.attendanceService.delete(attendance).subscribe(response => {             
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Selected attendence deleted'});
        });
        this.allAttendanceDialogue = false;
        this.ngOnInit();
      },    
      reject: () => {this.getAttendaceListByClass(attendance);}, 
      key: "deleteDialog"
    });
  
  }

  editAttendance(attendance: Attendance) {
    this.attendance = { ...attendance };
    this.editAttendanceDialogue = true;
    this.attendance.creationTime = new Date(this.attendance.creationTime);
    this.submitted=false;
    
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.attendances.length; i++) {
      if (this.attendance[i].attId === id) {
        index = i;
        break;
      }
    }
    return index;
  } 
    //get Attendance list based on the class id
  getAttendaceListByClass(attendance:any){
   
    this.attendanceService.getAttendanceList().subscribe((res) => {

      this.attendances = res.filter((val) => val.csId === attendance.csId);
      this.tempAttendances = this.attendances;
         
      console.log("class1 " + res);

      for (let index = 0; index < this.attendances.length; index++) { 
        if(this.AttendaceDateList.indexOf(this.attendances[index].attendanceDate) === -1){
          this.AttendaceDateList.push(this.attendances[index].attendanceDate);
       }

       const student = this.users.find(student => student.userId == this.attendances[index].studentId);
        if (student != null)  this.attendances[index].studentName = student.userFirstName;

        const cls = this.sessionList.find(cls => cls.csId == this.attendances[index].csId);
        if (cls != null)  this.attendances[index].csName = cls.classTopic;

        const batch = this.batchList.find(batch => batch.batchId == cls.batchId);
        if (batch != null)  this.attendances[index].batchName = batch.batchName;
      }})
  }

  //get attendance details based on selected attendance date
  getDateAndStudentList(){   
          
      console.log("class3 " + this.tempAttendances);
      console.log("Date " + this.selectedDate);
      
      this.attendances = this.tempAttendances.filter((val) => val.attendanceDate === this.selectedDate );
      console.log("class2 " + this.attendances);
      for (let index = 0; index < this.attendances.length; index++) { 
       
      
        const student = this.users.find(student => student.userId == this.attendances[index].studentId);
        if (student != null)  this.attendances[index].studentName = student.userFirstName;

        const cls = this.sessionList.find(cls => cls.csId == this.attendances[index].csId);
        if (cls != null)  this.attendances[index].csName = cls.classTopic;

        const batch = this.batchList.find(batch => batch.batchId == cls.batchId);
        if (batch != null)  this.attendances[index].batchName = batch.batchName;
               
      }
  }
 
  deleteSelectedAttendances(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Attendances?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendances = this.tempAttendances.filter(
            (val) => this.selectedAttendances.includes(val)
        );        
        this.selectedAttendances.forEach((value)=> (
          this.attendanceService.delete(value).subscribe(response => {   
           
          })  
        )) ;      
       
        this.selectedAttendances = null;
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Selected attendences deleted'});
        this.allAttendanceDialogue = false;
        this.ngOnInit();
        
      },
      reject: () => {
        this.selectedAttendances = null;
      },
      key: "myDialog"
    });
  }
  
  //get users list based on the batch id
  getUserAndClassList(){
    const batchid = this.selectedBatch.batchId;
    this.userService.getAllUsersByBatch(batchid).subscribe((data)=>{
         this.students = data});
    this.sessionService.getSessionsByBatch(batchid).subscribe((data)=>{
         this.sessionList = data});
  } 
   
}