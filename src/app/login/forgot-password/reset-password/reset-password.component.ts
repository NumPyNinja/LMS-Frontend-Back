import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../login';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  formErrors = {
    'password': '',
    'rePassword': '',
    'passwordGroup': '',
  };
  validationMessages = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'pattern': 'Password must contain at least one capital letter, one number, and one special character.'
    },
    'rePassword': {
      'required': 'Password is required.'
    },
    'passwordGroup': {
      'mismatchPassword': 'Passwords do not match.'
    },
  };
  hasError = false;
  token: any;
  userLoginEmailId: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log("this.token1");
    console.log(this.token);
    this.route.queryParams.subscribe((queryParams) => {
      this.userLoginEmailId = queryParams['email']; // Replace 'email' with the actual query parameter name
    });

    this.resetPassword = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{2,}")]],
        rePassword: ['', Validators.required],
      }, { validator: matchPassword }),
    });

    this.resetPassword.valueChanges.subscribe((data) => {
      this.logValidationErrors();
    });
  }

  logValidationErrors(group: FormGroup = this.resetPassword): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.hasError = true;
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onSubmit() {
    // Resetting the value of hasError to false
    this.hasError = false;
    this.logValidationErrors();
    if (!this.hasError) {
      
      const newPassword = this.resetPassword.get('passwordGroup.password').value;
      const resetDto: Login = {
        userLoginEmailId: this.userLoginEmailId,
        password: newPassword 
      };
      console.log("this.token2");
    console.log(this.token);
      this.authService.resetPassword(resetDto, this.token).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Password reset error:', error);
        }
      );
    }
  }
}

function matchPassword(group: AbstractControl): { [key: string]: any } | null {
  const passwordControl = group.get('password');
  const rePasswordControl = group.get('rePassword');

  if (passwordControl.value === rePasswordControl.value || rePasswordControl.pristine) {
    return null;
  } else {
    return { 'mismatchPassword': true };
  }
}
