import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';





@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  verificationCode: FormGroup;
  submitted = false;
 

  
  
  constructor(
    private fb : FormBuilder
  ) { }
  numericOnly(event) {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  ngOnInit(): void {
  
  this.verificationCode = this.fb.group({
        code: ['', [Validators.required, Validators.maxLength(1)
         ]]
    });
  }
  get f() { return this.verificationCode.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.verificationCode.invalid) {
      return;
    }
     
  }
}
  
  

  


   
   
  
  
  

