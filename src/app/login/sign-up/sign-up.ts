export interface SignUp {

    signup_id?:string,
    firstName?: string,
    lastName?: string,
    address?:string,
    streetName?: string,
    city?:string,
    state?:string,
    zipCode?:number,
    birthDate?: Date,
    userName?: string,
    phoneNumber?:number,
    emailAddress?:string,
    password?: string,
    
/*
    firstName?: "John",
    lastName?: "Dove",
    emailAddress?: "john_dovee1234@gmail.com",
    DOB?:"1/1/1995",
    phoneNumber?: 1243690401,
    location?: "Georgia",
    address?:"test",
    city?: "test",
    state?: "test",
    postalCode? : 12345,
    userName?: "john",
    password?: "john"
    */

}
