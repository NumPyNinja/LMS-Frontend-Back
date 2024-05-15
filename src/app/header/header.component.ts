import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import {UserService} from '../user/user.service';
import {User} from '../user/user';
import { BatchService } from 'src/app/batch/batch.service';
import {Batch} from '../batch/batch';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
 })
export class HeaderComponent implements OnInit {
  userNameList : any[];
  userList : any[];
  user : User;
  batchList : Batch[];
  selectedBatch: Batch;
  visibility: boolean = false;
  showText: boolean = true;

  isLoggedIn$: Observable<boolean>;


  userRole:Observable<string>;

  constructor(private authService: AuthService,
    private userService: UserService,
    private batchService: BatchService,
    public router: Router) { }
  ngOnInit() :void{ 
    this.isLoggedIn$ = this.authService.isLoggedIn;

   
    this.batchService.getBatchList().subscribe(list=>{
      this.batchList=list;
    });
    this.userService.getAllUsers().subscribe(userNameList=>{
      this.userNameList=userNameList;
    });

    this.authService.loggedInUserRole.subscribe((data: any) => 
      this.userRole =   data);
   
    

  }
  NewUser() { 
    sessionStorage.setItem('NewUser1', 'true');
  }
  AssignStaff(){
    sessionStorage.setItem('AssignStaff1', 'true');
  }
  AssignStudent(){
    sessionStorage.setItem('AssignStudent1', 'true');
  }
  Batch(){
    sessionStorage.setItem('NewBatch1', 'false');
    this.router.navigate(['/batch']);
  }
  NewBatch(){
    sessionStorage.setItem('NewBatch1', 'true');
  }
  AddAssign(){ 
      sessionStorage.setItem('AddAssign1', 'true');   
  }
  AddAttendance(){ 
    sessionStorage.setItem('AddAttendance1', 'true');      
  }
  Session() {
    sessionStorage.setItem('NewSession1', 'false');
    this.router.navigate(['/session']);
  }
  NewSession(){
    sessionStorage.setItem('NewSession1', 'true');
  }
  AddProgram(){
    sessionStorage.setItem('AddProgram1', 'true'); 
  } 
  onLogout() {
    this.authService.logout();
  }

  // -----------------Search user-------------------------
  
  search(event){
    let filtered: any[] = []; 
    let query = event.query;
    for (let i = 0; i < this.userNameList.length; i++) { 
      let userDetails = this.userNameList[i]; 
      if (userDetails.userFirstName.toLowerCase().indexOf(query.toLowerCase()) == 0) { 
          filtered.push(userDetails); 
      } 
      } 
      this.userList = filtered; 

      for (let index = 0; index < this.userList.length; index++) {  
        const batch = this.batchList.find(batch => batch.batchId == this.batchList[index].batchId);
        if (batch != null)  this.userList[index].batchName = batch.batchName;
    }
    // if(query <= 0 ||  query != event.userFirstName){
    //   console.log(query);
    //   this.showText = true;
    //   this.visibility = false;
    // }
  }
  onSelect(event){
    this.visibility = true;
    this.showText = false;
    this.router.navigate(['/search-user'])
    let filtered: any[] = []; 
    let query = event.userFirstName;
    for (let i = 0; i < this.userNameList.length; i++) { 
      let userDetails = this.userNameList[i]; 
      if (userDetails.userFirstName ==  query) { 
           this.showText = false;
          filtered.push(userDetails); 
      } 
      } 
      this.userList = filtered; 

      for (let index = 0; index < this.userList.length; index++) {  
        const batch = this.batchList.find(batch => batch.batchId == this.batchList[index].batchId);
        if (batch != null)  this.userList[index].batchName = batch.batchName;
    } 
  }
}

