import { Component, OnInit } from '@angular/core';

import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './email.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  [x: string]: any;
  hide = true;
  successMsg = 'Link has been sent on your registered email.';
  errorText = 'Mail id not found. Please enter a registered email id.'

  firstFormGroup: FormGroup;
  showError: boolean;

  constructor(private fb: FormBuilder,
  private emailService : EmailService) { }

  ngOnInit(): void {

    this.firstFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })

  }
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email address is required' :
      this.email.hasError('email') ? 'Please enter a valid email address' :
        '';
  }

  onClick() {
     if (this.email.invalid ) {
      this.showError = true;
    } else {
      this.showError = false;
      this.emailService.getEmail(this.email.value).subscribe((res)=>{
        this.displayValue = this.successMsg;
      }, (error) => {
         this.displayValue = this.errorText;
      });
    }
  }

  public resetform(): void {
    this.firstFormGroup.reset();
    this.displayValue=""; 
    this.showError=false;
  }
  
  get email() { return this.firstFormGroup.get('email'); }


}