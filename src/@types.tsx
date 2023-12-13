

export default interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    image?: string;
    documents?:[string]
    phone: number;
    gender:string;
    address?: {
      name: string;
      house: string;
      post: string;
      pin: number;
      contact: number;
      state: string;
      District: string;
    }[];
    specialization?: string;
    fee?: number;
    formStatus:string;
    hospital?: string;
    experience?: number;
    role?: 'patient' | 'doctor'|'admin';
    wallet?: {

      balance:number
      transaction:string
    };
    isBlocked?: boolean;
    isApproved?:boolean,
    isVerified?:boolean;
    timeTolive?:Date|number
  }

  



  export default interface Booking {
    _id:string;
    doctorId: string;
    status: string;
    date: string;
    time:string;
    fee?: number;
    end: string;
    feedback?:[]; 
    note: string;
    userAge: number;
    userId:string;
    userName: string;
  }
  