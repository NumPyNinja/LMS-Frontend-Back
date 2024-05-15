export interface Session {
  csId?:number;
  batchId?:number;
  classNo?:number;
  classDate?:Date;
  classTopic?:string;
  classStaffId?:string;
  classDescription?:string;
  classComments?:string;
  classNotes?:any;
  classRecordingPath?:any;
  sessionStatus?:any;
  classStaffName?:any;
batchName?:string;
classStatus?:string;
}
export interface Staff{
  userId?:string;
  staffName?:string;

}