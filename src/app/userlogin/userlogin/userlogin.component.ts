import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../userlogin.service';
import { UserLogin } from '../userlogin';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  userLogin:UserLogin[];

  constructor(private userloginService :UserloginService) { }

  ngOnInit(): void {
    this.userloginService.getUserLogin().subscribe((userLogin:UserLogin[])=>{
      this.userLogin=userLogin;
    })
  }
  
}
