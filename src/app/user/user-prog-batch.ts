import { UserRoleProgramBatch } from "./user-role-program-batch";
export interface UserProgBatch {
    userId? : string;
    userRole ? : string;
    userStatus ? : string;
    programId ? : number;
    userRoleProgramBatches ? : UserRoleProgramBatch[];

}
