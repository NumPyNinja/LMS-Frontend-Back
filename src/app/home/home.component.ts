import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  
   userRole: string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
      
    this.authService.loggedInUserRole.subscribe((data: any) => 
    this.userRole =   data[0]); 
  
  }
}

