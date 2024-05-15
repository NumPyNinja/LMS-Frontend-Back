import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { UserloginService } from 'src/app/userlogin/userlogin.service';
import { Staff, User, userEmailUser } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  
  users: User[];
  usersWithRolesList: User[];
  user:User;
  visibility: boolean = false;
  userSize: number;
  selectedUsers: User[];
  submitted: boolean;
  userDialogue : boolean = false;
  viewUserDialogue:boolean=false;
  role = new FormControl();
  userRoleMaps:string[]=['R01','R02','R03'];
  userRoleDropdown: SelectItem[];
  roleStatus:string[]=['Active','Inactive'];
  roleStatusDropdown: SelectItem[]; //Jo
  userVisaStatus: string[] = ['Not-Specified', 'NA', 'GC-EAD', 'H4-EAD', 'H4', 'H1B', 
  'Canada-EAD', 'Indian-Citizen', 'US-Citizen', 'Canada-Citizen'];
  timeZone: string[]=["PST", "MST", "CST", "EST", "IST"];
  userVisaStatusOptions: SelectItem[]; //Jo
  userVisaStatusControl: FormControl;
  visaStatusValue: string;
  userRoleStatusControl: FormControl;
  roleStatusValue:string;
  userRoleMapsControl:FormControl;
  userRoleMapsValue:string;
  assignProgBatchDialogue : boolean;assignStaffDialogue:boolean;
  programList: Program[];programListTemp: Program[];
  batchList : Batch[];batchListTemp :Batch[];StaffBatch:Batch[]=[];
  progBatchList:User[];progBatchListTemp:User[]=[];
  submittedPB :boolean =false;
 userList:User[];userListTemp:User[]=[];
 userID:any;
 userObject :boolean;
  rowID: any;
  selectedUser: any;
  dialogRef: any;
  selectedEmail: any;
  user1: User[];
  selectedUser1: User;
  user2: any;
  staffList:User[];staffListTemp:Staff[]=[];
 userRoleList:User[];
 userEmailUserList:userEmailUser[]=[];
 userMapWithRolesList:any;
 userMapWithRolesListT:any;
 userAllList:any;userAllListT:any;
 hiddenPB:boolean=false;hiddenPBDB:boolean=false;
 userRole:string[]=['Staff','Student']
 changePB:boolean=false;hiddenPBActive:boolean=false;hiddenPBLimit:boolean=false;StaffLimit:boolean=false;
 roleId:string="";pid:string="";bid:string="";bstatus:string="";
 assignProgBatchSSForm: any; StudentVisible:boolean=false;StaffVisible:boolean=false;
 selectedBatchName: User[];
 hidden:boolean=false;
 userActiveList: User[];
 editmode:boolean=false;studentStatus:boolean=true;
 newUser1:string;assignStaff1:string;assignStudent1:string;
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private programService: ProgramService,
    private batchService: BatchService,
    private dialog: MatDialog,
    private router: Router,
    private userLoginService: UserloginService
    ){ }
  ngOnInit(): void {  
    this.getUserList();
    this.userService.getUsers().subscribe(res => {
    this.usersWithRolesList = res;
    },
    (error) => {
      console.log(error);
    });


    this.userVisaStatusControl = new FormControl();
    this.userVisaStatusControl.valueChanges.subscribe((val)=>{
     
      this.visaStatusValue=val;
    });
    this.userRoleStatusControl = new FormControl();
    this.userRoleStatusControl.valueChanges.subscribe((val) => {
      this.roleStatusValue = val;
    });
     
    this.programService.getPrograms().subscribe(list => {
    this.programList = list;
    this.programListTemp=this.programList;
        });
    
    this.batchService.getBatchList().subscribe(list => {
        this.batchList = list;
        this.batchListTemp=this.batchList;
    });
    this.userService.getAllUsers().subscribe(list=>{
      this.userList=list;
    });
    this.userService.getAllActiveUsers().subscribe(list=>{
      this.userActiveList=list;
    });
    const getUsers$ = this.userService.getUsers();
    getUsers$.subscribe(userRoleMap1 => {
        this.userMapWithRolesList=userRoleMap1;
        this.userMapWithRolesListT=this.userMapWithRolesList;
    }); 
    this.userRoleDropdown = this.userRoleMaps.map(role => ({ label: role, value: role }));
    this.userVisaStatusOptions=this.userVisaStatus.map(vstatus => ({ label: vstatus, value: vstatus }));
    this.roleStatusDropdown = this.roleStatus.map(rStatus => ({ label: rStatus, value: rStatus })); 
  
  }
//Tool Bar Menu Assign student/Staff,New User
ngDoCheck() {
  this.newUser1=sessionStorage.getItem('NewUser1');
  this.assignStaff1=sessionStorage.getItem('AssignStaff1');
  this.assignStudent1=sessionStorage.getItem('AssignStudent1');
 if( this.newUser1=='true' || this.assignStaff1=='true' || this.assignStudent1=='true'){
 if(this.newUser1=='true'){
 sessionStorage.removeItem("NewUser1");
 sessionStorage.removeItem("AssignStaff1");
 sessionStorage.removeItem("AssignStudent1");
  this.openNew();}

else if(this.assignStaff1=='true'){
sessionStorage.removeItem("NewUser1");
sessionStorage.removeItem("AssignStaff1");
sessionStorage.removeItem("AssignStudent1");
    this.openAssignStaff();}
else if(this.assignStudent1=='true'){
sessionStorage.removeItem("NewUser1");
sessionStorage.removeItem("AssignStaff1");
sessionStorage.removeItem("AssignStudent1");
   this.openAssignDialog();}
}

}
//get  only Active User 
getActiveUser()
{
 
    this.userList.forEach(item => {
      if(this.userActiveList.some(Y =>Y.userId === item.userId))
        this.userListTemp.push(item);
    });

}
  //Staff name = FirstName + Last Name Dropdown
staffIDFunction(){
  this.staffList.forEach(item => {
    if(this.staffListTemp.filter(x => x.userId == item.userId).length==0) {
      this.staffListTemp.push({userId:item.userId,staffName:item.userFirstName+" "+item.userLastName});
    }
  });
} 
//Based on the  Role  email are  Display
updateFilteredUserRoleID(){
  this.userListTemp=[];
  this.getActiveUser();
  if(this.assignStaffDialogue){
    this.roleId='R02';
    this.assignStaffForm.get('roleId').setValue(this.roleId);
    this.selectedBatchName = [];
    this.updateUserBasedEmailId(); 
   }
  if(this.assignProgBatchDialogue){
    this.roleId='R03'; 
    this.assignProgBatchForm.get('roleId').setValue(this.roleId);
    this.updateUserBasedEmailId();  
  }
}   
 updateUserBasedEmailId(){

  this.userEmailUserList=[];
  this.programList = this.programListTemp;
  this.programList = this.programList.filter(item => item.programStatus=='Active');
  this.userMapWithRolesList=this.userMapWithRolesListT;
  this.userMapWithRolesList = this.userMapWithRolesList.filter(item => item.role.roleId === this.roleId);
  if(this.userMapWithRolesList.length!=0)
  this.userListTemp.forEach(item => {
    if(this.userMapWithRolesList.some(Y =>Y.user.userId === item.userId))
      this.userEmailUserList.push({userId:item.userId,userFullName:item.userLoginEmail});
  });
  }
 
  StaffProgramBatch(){
    let user:any;let skillN="";
    this.assignStaffForm.get('batchName').setValue("");
    this.assignStaffForm.get('programName').setValue("");
    this.assignStaffForm.get('userStatus').setValue("");
    this.assignStaffForm.get('skillName').setValue("");
    this.StaffLimit=false;
    user=this.assignStaffForm.value.userId;
    this.userService.getById(user.userId).subscribe(list=>{
      this.progBatchList=list;
      this.progBatchListTemp=this.progBatchList;
    });
    this.userService.getUserInfoById(user.userId).subscribe(list=>{
         this.userAllList=list;
        this.userAllListT=this.userAllList;
        for(let i=0;this.userAllList.skills.length>i;i++)
        skillN +=this.userAllList.skills[i].skillName + " ";
        this.assignStaffForm.get('skillName').setValue(skillN);
      });
    if(!skillN)
    this.assignStaffForm.get('skillName').setValue("N/A");
    }

  StudentProgramBatch(){
    this.assignProgBatchForm.get('batchName').setValue("");
    this.assignProgBatchForm.get('programName').setValue("");
    this.assignProgBatchForm.get('userStatus').setValue("");
    this.hiddenPBLimit=false;
  const user=this.assignProgBatchForm.value.userId;
  let pid1="";let bid1="";let bstatus1="";
  this.userService.getUserInfoById(user.userId).subscribe(list=>{
    this.userAllList=list;
   this.userAllListT=this.userAllList;
   if(!this.assignProgBatchForm.value.programName){
    this.hiddenPBDB=true;this.hiddenPBActive=false;
    this.hiddenPB=false; this.changePB=false;}
        if (this.userAllList.length != 0 ) {
          if(this.userAllList.programBatches.length!=0){
          for(let i=0;this.userAllList.programBatches.length>i;i++){
            for(let j=0;this.userAllList.programBatches[i].batches.length>j;j++){ 
           pid1=this.userAllList.programBatches[i].programName;
           this.pid=this.userAllList.programBatches[i].programId;
           bid1=this.userAllList.programBatches[i].batches[j].batchName;
           this.bid=this.userAllList.programBatches[i].batches[j].batchId;
           bstatus1=this.userAllList.programBatches[i].batches[j].userBatchStatus;
          } 
          if(bstatus1=="Active")
          break;
      }  
   
    }
      this.hiddenPB=true;this.hiddenPBDB=false; this.changePB=true;this.studentStatus=true;
      this.assignProgBatchForm.get('programName').setValue(pid1);
      this.assignProgBatchForm.get('batchName').setValue(bid1);
      this.assignProgBatchForm.get('userStatus').setValue(bstatus1);
    }});
     
    
  }
ChangeProBat(){
  if(this.assignProgBatchForm.value.userStatus=='Inactive' && this.userAllList.programBatches.length <3){
    this.hiddenPBDB=true;
    this.hiddenPB=false;
    this.hiddenPBLimit=false;
    this.assignProgBatchForm.get('userStatus').setValue("");}
 else if(this.assignProgBatchForm.value.userStatus=='Active' && this.userAllList.programBatches.length <3){
  this.confirmationService.confirm({
    message: 'Are you sure you want remove User from existing '+ this.assignProgBatchForm.value.programName+'/'+this.assignProgBatchForm.value.batchName + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.assignProgBatchForm.get('userStatus').setValue("Inactive");
      this.assignProgramBatch();
      //this.messageService.add({severity:'success', summary: 'Successful', detail: 'User InActive', life: 3000});
    }
    
});
}
 
  else
  this.hiddenPBLimit=true;
}
updateFilteredBatchNames(){
   let progData:any;
   this.selectedBatchName = [];
    this.batchList = this.batchListTemp;
    this.progBatchList=this.progBatchListTemp;
    if(this.assignStaffDialogue)
    progData = this.assignStaffForm.value.programName;
   else
    progData = this.assignProgBatchForm.value.programName;
    const pid :any=progData.programId;
    this.batchList = this.batchList.filter(item => item.programId === pid && item.batchStatus=='ACTIVE');
    if(this.assignStaffDialogue && this.progBatchList.length>0){
      this.progBatchList.forEach(item => {
      this.batchList=this.batchList.filter(y=> y.batchId != item.batchId)
    });
  }
}
  private selectRow(checkValue: any) {
  
  }

  private getUserList() { 
    this.visibility = true;
    this.userService.getAllActiveUsers().subscribe(users => {
    this.users = users; 
    this.visibility = false;
   });
  }

  viewUser(user: User) {
    this.user = { ...user };
    this.viewUserDialogue = true;
  }

  hideDialog() {
    this.user={};
    this.userDialogue = false;
   // this.viewUserDialogue=false;
    this.assignProgBatchDialogue=false;
    this.assignStaffDialogue=false;
    this.submitted=false;
  }

  openAssignDialog(){
    this.submittedPB=false;
    this.hiddenPB=true;this.hiddenPBDB=false;this.changePB=false;this.hiddenPBActive=false;this.hiddenPBLimit=false;
    this.assignProgBatchDialogue=true;
    this.assignProgBatchForm.reset();
    this.updateFilteredUserRoleID();
  }
  openAssignStaff()
  {
     this.submittedPB=false;
     this.assignStaffDialogue=true;
     this.StaffLimit=false;
     this.assignStaffForm.reset();
     this.updateFilteredUserRoleID();
  }
  
  openNew() {
    this.user = {};
    this.editmode=false;
    this.submitted = false;
    this.userDialogue = true;
    this.userForm.reset();
  }

    userForm = this.fb.group({
      userId: [''],
      userComments: [''],
      userEduPg: [''],
      userEduUg: ['', Validators.required, ],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userLinkedinUrl: [''],
      userLocation: ['', Validators.required],
      userMiddleName: [''],
      userPhoneNumber: ['', Validators.required],
      userTimeZone: ['', Validators.required],
      userVisaStatus: ['', Validators.required],
      roleId : [''],
      userRoleStatus: [''],
      userLogin: this.fb.group({
        loginStatus: ['Active'],
        password: [''],
        userLoginEmail: ['', [Validators.required, Validators.email]],
      }),
      userRoleMaps: this.fb.array([
        this.fb.group({
          roleId: [''],
          userRoleStatus: [''],
        })
      ]),
    });

  assignProgBatchForm = this.fb.group({
    programName: ['', Validators.required],
    batchName: ['', Validators.required],
    userId: ['', Validators.required],
    userStatus:['', Validators.required],
    roleId:['', Validators.required]
  });
 assignStaffForm = this.fb.group({
    programName: ['', Validators.required],
    batchName: ['', Validators.required],
    userId: ['', Validators.required],
    userStatus:['', Validators.required],
    roleId:['', Validators.required],
    skillName : ['']
  });
  hasUnitNumber = false;

 /*** 
  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];
  **/

editUser(user: User) {
  this.editmode=true;
  this.userDialogue = true;
  this.user={...user};
    const targetUserId=user.userId;
    const getAllUsers$ = this.userService.getAllUsers();
    const getUsers$ = this.userService.getUsers();
    getAllUsers$.subscribe(
      allUsers => console.log('allUsers:', allUsers),
      error => console.error('Error fetching allUsers', error)
    );
    
    getUsers$.subscribe(
      userRoleMap1 => {
        console.log('userRoleMap1:', userRoleMap1);
        const userMapWithRoles :any=userRoleMap1;
        const testUser=userMapWithRoles.find(userMap => userMap.user?.userId == targetUserId);
        console.log("testUser="+testUser);
        const userRoleStatus1 = testUser.userRoleStatus;
            const userRoleId1 = testUser.role.roleId;
            this.userForm.get('userRoleStatus').setValue(userRoleStatus1);
            this.userForm.get('roleId').setValue(userRoleId1);
        },
        error => console.error('Error fetching userRoleMap1', error)
    );

   //const targetUserId=user.userId;
    

/**
    forkJoin([getAllUsers$, getUsers$]).subscribe(
      ([allUsers, userRoleMap1]) => {
        this.users = allUsers;
        allUsers.forEach(allUser => {
          const correspondingUser = userRoleMap1.find(userMap => userMap.user?.userId == targetUserId);
          if (correspondingUser) {
            const userRoleStatus = correspondingUser.userRoleStatus;
            const userRoleId = correspondingUser.role.roleId;
            //this.userForm.get('userRoleMaps').get('0.userRoleStatus').setValue(userRoleStatus);
            //this.userForm.get('userRoleMaps').get('0.roleId').setValue(userRoleId);
           this.userForm.get('userRoleStatus').setValue(userRoleStatus);
          
           this.userForm.get('roleId').setValue(userRoleId);
          this.user = { ...user, userId: user.userId };

          }
        });
         
        this.visibility = false;
        
      },
      error => {
        console.error('Error fetching data', error);
        this.visibility = false;
      }
    ); 
    */
    const userEmail=this.userList.find(userId => userId.userId == targetUserId);
    const userEmailAddress=userEmail.userLoginEmail;
    this.userForm.patchValue(user);
    this.userForm.get('userLogin.userLoginEmail').patchValue(userEmailAddress);

  }

  visaStatusChanged(event: any) {
    console.log("event=="+event);
    //this.visaStatusValue = event.value;
    this.userVisaStatus=event.value;
  }

  userRoleStatusChanged(value: string) {
    this.userRoleStatusControl.setValue(value);
  }

  userRoleMapStatusChanged(value: string) {
    
  }
  //Code for adding new user
  onSubmit() {
    this.submitted = true;
    
    if (this.userForm.valid) {
      if (this.userForm.value.userId) {//Edit User
      // const updatedUser= { ...this.userForm.value };
       const userData= {
          userId: this.userForm.value.userId,
          userComments: this.userForm.value.userComments,
          userEduPg: this.userForm.value.userEduPg,
          userEduUg: this.userForm.value.userEduUg,
          userFirstName: this.userForm.value.userFirstName,
          userLastName: this.userForm.value.userLastName,
          userLinkedinUrl: this.userForm.value.userLinkedinUrl,
          userLocation: this.userForm.value.userLocation,
          userMiddleName: this.userForm.value.userMiddleName,
          userPhoneNumber: this.userForm.value.userPhoneNumber,
          userTimeZone: this.userForm.value.userTimeZone,
          userVisaStatus: this.userForm.value.userVisaStatus,
          userLoginEmail: this.userForm.value.userLogin.userLoginEmail,
        };
        //this.users[this.findIndexById(this.userForm.value.userId)] = this.userForm.value.userId;
        const index = this.findIndexById(this.userForm.value.userId);
        this.users[index] = { ...this.userForm.value };
         this.userService.updateUser(userData).subscribe((res) => {
          console.log('User updated successfully');
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Updated Successfully',
            life: 3000,
            
          });
          this.getUserList();
          this.userDialogue = false;
        },
        (error) => {
          console.error('Error updating user', error);
          console.log(error.message);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: error.error.message,
            life: 3000,
            
          });
          //alert('Error updating user details.');
        }
        );
        this.userDialogue = false;
       this.user = {};
      }
       else { //may be new User
       // this.userSize = this.userSize + 1;
        //this.user.userId = this.userSize.toString();
        
    //  }
      this.userForm.get('userLogin.loginStatus').setValue('Active');
    
      const role=this.userForm.value.roleId;
      const testRoleStatus =this.userForm.value.userRoleStatus;
      this.userForm.get('userRoleMaps').get('0.roleId').setValue(role);
      this.userForm.get('userRoleMaps').get('0.userRoleStatus').setValue(testRoleStatus);
        const userData = this.userForm.value;
        this.userForm.controls['userVisaStatus'].setValue(this.visaStatusValue);
       // const role=this.roleStatusValue;
      //  this.userForm.get('userRoleMaps').get('0.userRoleStatus').setValue(role);
        if (this.userForm.value && this.userForm.value.userPhoneNumber) {
          this.userForm.value.userPhoneNumber = parseInt(this.userForm.value.userPhoneNumber, 11);
        }
        
        delete userData.roleId;
        delete userData.userRoleStatus;
        delete userData.userId;
        

        this.userService.addUser(userData).subscribe({
          next:(res) => {
            this.userForm.reset();
            this.submitted = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Added Successfully',
              life: 3000,
          });
            this.getUserList();
            this.user={};
          },
         error:(error) =>
          {
            console.log("error=="+error.message);
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: error.error.message,
              life: 2000,
              
            });
           // alert("Error adding user details.");
          }
        })
      this.userDialogue = false;
      this.user= {};
    }
  }
}
    
  deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected Users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));
            this.selectedUsers = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
        }
    });
}
  deleteUser(user: User) {
    this.confirmationService.confirm({
    
       message: 'Are you sure you want to delete the user?', 
       header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.userId !== user.userId);
            this.userService.deleteUser(user).subscribe(response => {
              console.log('User is deleted');
            })
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        }
    });
}

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  onRowClicked(templateRef,row){
    this.rowID = row['userId'];
    this.selectedUser= this.users.find((user) => user.userId.toString() === this.rowID);
    console.log(this.selectedUser);
    this.userService.getAllUsers().subscribe(user1 => {
      this.user1=user1;
      console.log(user1);
      this.selectedUser1= this.user1.find((user) => user.userId.toString() === this.selectedUser.userId.toString());
      
});

    this.dialogRef = this.dialog.open(templateRef, {
      height: '550px',
      width: '700px',
    });

  }
  onCloseDialog() {
    this.dialogRef.close();
  }
  assignProgramBatch(){
    this.submittedPB = true;
    if(this.assignProgBatchForm.valid && !this.hiddenPBLimit){
          const progData :any = this.assignProgBatchForm.value.programName;
            const batchData :any  = this.assignProgBatchForm.value.batchName;
            const status = this.assignProgBatchForm.value.userStatus;
      if(this.hiddenPBDB){
        this.pid=progData.programId;
        this.bid=batchData.batchId;}
      const userPBData = {
        programId:this.pid,
        roleId:this.roleId,
        userId:this.assignProgBatchForm.value.userId.userId,
                userRoleProgramBatches:[
          {
              batchId:this.bid,
              userRoleProgramBatchStatus:status
          }
        ]
      } 

      this.userService.assignProgBatch(userPBData).subscribe((res) => {
      this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User  has been successfully assigned/Updated to Program/Batch(es)',
          life: 2000,
        });
        if(!this.hiddenPBDB && this.assignProgBatchForm.value.userStatus=='Inactive'){
          this.hiddenPBDB=true;
        this.hiddenPB=false;
        this.hiddenPBLimit=false;
        this.submittedPB = false;
        this.assignProgBatchForm.get('userStatus').setValue("");
          }   
      else
      this.assignProgBatchDialogue=false;    
      }, (error)=> {
            this.assignProgBatchDialogue=false;
            this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: error.error.message,
            life: 2000,
        });
      });
}
    else {
      console.log("Invalid form");
    }
  }
  assignStaff(){
    this.submittedPB = true;
    if(this.progBatchList.length>=10)
      this.StaffLimit=true;
    if(this.assignStaffForm.valid && this.progBatchList.length<=10){  
      this.selectedBatchName.forEach((selectedBatchName) => {
      const progData :any = this.assignStaffForm.value.programName;
      const status = this.assignStaffForm.value.userStatus;  
      const userPBData = {
        programId:progData.programId,
        roleId:this.roleId,
        userId:this.assignStaffForm.value.userId.userId,
        userRoleProgramBatches:[
          {
              batchId:selectedBatchName.batchId,
              userRoleProgramBatchStatus:status
          }
        ]
      } 

      this.userService.assignProgBatch(userPBData).subscribe((res) => {
      this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User  has been successfully assigned/Updated to Program/Batch(es)',
          life: 2000,
        });
    
     this.assignStaffDialogue=false;
      
      }, (error)=> {
         this.assignStaffDialogue=false;
            this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: error.error.message,
            life: 2000,
        });
      });
 
  });

  }
  else {
    console.log("Invalid form");
  }
  
  }
        /**
            this.assignProgBatchDialogue=false;
            console.error('Other error:', error.status, error.statusText);
            if(error.status === 200){
              console.log("true");
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'User  has been successfully assigned to Program/Batch(es)',
                life: 2000,
              });
              this.assignProgBatchDialogue=false;
            }else{
              this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: error.error.message,
              life: 2000,
            });
          }
           */
     // });

      
}