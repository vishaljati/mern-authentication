
export interface IUser{
    username:string;
    email:string;
    mobile_no?:number;
    password:string;
    isVerified:boolean
    refreshToken?:string
}
export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken():string;
  generateRefreshToken():string;

}
