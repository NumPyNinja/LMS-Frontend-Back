import { UserLogin } from "../userlogin/userlogin";
import { UserRoleMaps } from "./user-role-maps";
import { UserRoleProgramBatch } from "./user-role-program-batch";

export interface User {
    user?:string;
    userId?:string;
    userFirstName?: string;
    userMiddleName?:string;
    userLastName?: string;
    userPhoneNumber?: number;
    userLocation?: string;
    userTimeZone?: string,
    userLinkedinUrl?: string;
    userEduUg?: string;
    userEduPg?: string,
    userComments?: string;
    userVisaStatus?: string;
    userLoginEmail?:string;
    userLogin?: UserLogin;
    roleId?:string;
    userRoleStatus?:string;
    userRoleMaps?: UserRoleMaps[]; 
    programName?: string;
    batchName?: string;
    userStatus?: boolean;
    programId?:number;
    batchId ?:number;
    userRole ? : string;
    userid ?:string;
    userRoleProgramBatches ? : UserRoleProgramBatch[];   
    userRoleProgramBatchStatus?:any; 
}
export interface Staff{
    userId?:string;
    staffName?:string;
}
export interface userEmailUser{
    userId?:any;
    userFullName?:string;
    roleId?:string;
}

