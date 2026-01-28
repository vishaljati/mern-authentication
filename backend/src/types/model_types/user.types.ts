
export interface IUser {
    username: string;
    email: string;
    mobile_no?: number
    password: string;
    isVerified: boolean;
    refreshToken:string;
}