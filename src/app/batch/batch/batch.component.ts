import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Batch, BatchAssignUser } from '../batch';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 250px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class BatchComponent implements OnInit {

  batchList: Batch[];
  batch: Batch;
  selectedBatches: Batch[];
  submitted: boolean;
  programSize: number;
  visibility: boolean = false;
  batchDialogue: boolean;
  programName: string;
  status: string[] = ['ACTIVE', 'INACTIVE'];
  programList: Program[];
  activeProgramList : Program[];
  onEdit : boolean = false;
  pattBatchName:boolean=false;
  pattBatchDes:boolean=false;
  checkbatchN:boolean=false;
  newBatch1:string;
  allBatches1:string;
  batchAssignUser:boolean=false;
  batchNameAssignUser:any;
  userMapWithRolesList:any;
  userMapWithRolesListT:any;
  batchuserList:BatchAssignUser[]=[];
  userList:User[];
  progBatchList:User[];progBatchListTemp:User[]=[];
  constructor(
    private batchService: BatchService,
    private programService: ProgramService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog,
    private userService:UserService,
  ) { }

  ngDoCheck() {
    this.newBatch1 = sessionStorage.getItem("NewBatch1");
  

    if (this.newBatch1 == 'true'){
      if (this.newBatch1 == 'true') {
        sessionStorage.removeItem("NewBatch1");
      
        this.openNew();
      }
      {
        sessionStorage.removeItem("NewBatch1");
        this.openNew();
      }
    }
  }

  ngOnInit() {
    this.batchService.getBatchList().subscribe(res => {
      this.batchList = res.filter(item=>item.batchStatus.toLowerCase()==="active");
      this.programSize = this.batchList.length;
    });
    this.userService.getAllUsers().subscribe(list=>{
      this.userList=list;
    });

    this.userService.getAllUserRoleProgramBatchMap().subscribe(list=>{
      this.progBatchList=list;
      this.progBatchListTemp=this.progBatchList;
    });
    this.programService.getPrograms().subscribe(list => {
      this.programList = list;
      this.activeProgramList = this.programList.filter(program => program.programStatus === 'Active');
    });
    const getUsers$ = this.userService.getUsers();
    getUsers$.subscribe(userRoleMap1 => {
        this.userMapWithRolesList=userRoleMap1;
        this.userMapWithRolesListT=this.userMapWithRolesList;
    }); 
  }
  
  openNew() {
    this.onEdit=false;
    this.batch = {};
    this.submitted = false;
    this.batchDialogue = true;
  }

  hideDialog() {
    this.batchDialogue = false;
    this.submitted = false;
  }

  saveBatch(): void {
    this.submitted = true;
    if(this.batch.batchName && this.batch.programName && this.batch.batchDescription && this.batch.batchNoOfClasses && this.batch.batchStatus && !this.pattBatchName && !this.pattBatchDes && !this.checkbatchN){
    //  if (this.batch.batchName.trim()) { //edit batch

      //const pro: any = this.batch.programName;
      //const pro1: any = this.batch.programId;
      //this.batch.programId = pro.programId;
      //this.batch.programName = pro.programName;

      if (this.batch.batchId) {
        this.batchList[this.findIndexById(this.batch.batchId)] = this.batch;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'batch Updated',
          life: 3000,
        });
      //  this.batch.programName = pro.programName;
       // this.batch.programId = pro1;
        this.batchService.updateBatch(this.batch).subscribe((res) => {
          console.log('a batch is updated')
        });
      } else {
delete this.batch.batchProg;
          const pro: any = this.batch.programName;
          this.batch.programName = pro.programName;
          this.batch.batchName=pro.programName+this.batch.batchName;
          this.programSize = this.programSize + 1;
          this.batch.programId=pro.programId;
          this.batchService.addBatch(this.batch).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: ' Batch Created Successfully',
            life: 3000,
          });
          this.ngOnInit();
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: error,
            life: 3000,
          });
        });
      }
      this.batchList = [...this.batchList];
      this.batchDialogue = false;
      this.batch = {};
   // }
  }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.batchList.length; i++) {
      if (this.batchList[i].batchId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  private getMaxBatchId(max: number) {
    this.batchList.forEach((character) => {
      const tempBatchId = Number(character.batchId);

      if (tempBatchId > max) {
        max = tempBatchId;
      }
    });
    return max;
  }

  editBatch(batch: Batch) {
    // this.programName =pro;
    this.onEdit=true;
    this.batch = { ...batch };
    this.batchDialogue = true;
  }

  deleteBatch(batch: Batch) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + batch.batchName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchList = this.batchList.filter((val) => val.batchId !== batch.batchId);

        this.batchService.deleteBatch(batch).subscribe(response => {
          console.log('a batch is deleted');
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'batch Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteSelectedBatches() {
    this.confirmationService.confirm({

      message: 'Are you sure you want to delete the selected batches?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchList = this.batchList.filter(
          (val) => !this.selectedBatches.includes(val)
        );
        this.selectedBatches = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Batches Deleted',
          life: 3000,
        });
      },
    });
  }
  //pattern validation for batch Name and batch description
  patternDesc(patt, field)
  {
if(patt!=undefined){
     const pattern=/^[a-zA-Z][a-zA-Z0-9 ]{1}.*/;
       const patternN=/^[0-9]{0,5}$/;
       if(!patternN.test(patt)&&field==1&&!this.onEdit){
       this.pattBatchName=true;
       return  this.pattBatchName;
     }
     else if(!pattern.test(patt)&&field==2){
      this.pattBatchDes=true;
      return this.pattBatchDes;
    }
    else{
  
     this.pattBatchDes=false;
     this.pattBatchName=false;
     return false;}
}
  }
//Batch Name  unique  check
batchNameUnique(batchN: string){
  if(this.batchList.find(y => y.batchName == batchN)&&!this.onEdit){
    this.checkbatchN=true;
    return true;
  }
  else{
    this.checkbatchN=false;
    return false;
  }
}
ChangeProgramName()
{
  const pro: any = this.batch.programName;
  this.batch.batchProg=pro.programName;
  this.batch.batchName="";
}
onRowClicked(row){
this.batchuserList=[];
this.batchNameAssignUser=row.batchName;
this.userMapWithRolesList=this.userMapWithRolesListT;
  this.userMapWithRolesList = this.userMapWithRolesList.filter(item => item.role.roleId == "R03");
  if(this.userMapWithRolesList.length!=0)
  this.userList.forEach(item => {
    if(this.userMapWithRolesList.some(Y =>Y.userId == item.userId))
      if(this.progBatchListTemp.some(Y =>Y.batchId == row.batchId && Y.userId == item.userId))
      this.batchuserList.push({userId:item.userId,userFullName:item.userFirstName+" "+item.userLastName,userLoginEmail:item.userLoginEmail});
  });
 
  this.batchAssignUser=true;
  }

}