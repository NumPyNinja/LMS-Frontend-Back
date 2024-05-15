import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BatchComponent } from './batch/batch/batch.component';
import { UserComponent } from './user/user/user.component';
import { AssignmentComponent } from './assignment/assignment/assignment.component';
import { AttendanceComponent } from './attendance/attendance/attendance.component';
import { SignupComponent } from './login/sign-up/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/forgot-password/reset-password/reset-password.component';
import { SessionComponent } from './session/session/session.component';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProgramComponent } from './program/program/program.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard/staffdashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'program', component: ProgramComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'batch', component: BatchComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent },
  { path: 'assignment', component: AssignmentComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'session', component: SessionComponent,canActivate:[AuthGuard]},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  {path: 'reset-password' , component:ResetPasswordComponent},
  {path: 'search-user' , component:SearchUserComponent},
  {path: 'staffdashboard' , component:StaffdashboardComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
