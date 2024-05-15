export interface Attendance {
    attId?: string;
    csId?:number;
    csName?: string;
    studentId?:string;
    studentName?:string;
    users?: [] ;
    attendance?: string;
    attendanceList?:[];
    creationTime?: Date;
    batchId?: string;
    batchName?: string;
    attendanceDate?: Date;
}