export interface Batch {
  batchId?:  number ;
  batchName?: string;
  batchDescription?: string;
  batchStatus?: any;
  batchNoOfClasses?: number ;
  programName?: string;
  programId?: any;
batchProg?:any;
}
export interface BatchAssignUser{
  userId?:any;
  userFullName?:string;
  userLoginEmail?:string;
}