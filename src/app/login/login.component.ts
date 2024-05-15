import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Login } from './login';
import { LoginService } from './login.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login:Login[];
  form: FormGroup;
  private formSubmitAttempt: boolean;
  showErrorMessage: boolean = false;
  responseData: any;

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private loginService:LoginService) {}

  ngOnInit() {
    this.form = this.fb.group({
      userLoginEmailId: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginService.getLogin().subscribe((login:Login[])=>{
      this.login=login;
    })
    // this.loginService.makeAuthenticatedRequest().subscribe(
    //   (response) => {
    //     this.responseData = response;
    //     console.log('Response:', response);
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

 // async onSubmit() {
  onSubmit() {
    if (this.form.valid) {
      const user = {
        userLoginEmailId: this.form.value.userLoginEmailId,
        password: this.form.value.password
      };
     // this.authService.login(user);
     this.authService.login(user)
     .pipe(first())
     .subscribe(
         data => {
            this.formSubmitAttempt = true;
         },
         error => {
          this.showErrorMessage = true;
         });
    
    //this.formSubmitAttempt = true;
    //this.validateCredentials();
  }
}

  private validateCredentials() {

    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) =>{
      if (!isLoggedIn) {
        this.showErrorMessage = true;
      }
    });
  }
}
