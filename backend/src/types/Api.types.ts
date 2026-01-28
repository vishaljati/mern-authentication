export interface ApiSuccess<T> {

    success: true;
    statusCode: number;
    message: string;
    data?: T;

}

export interface ApiFailure {
    success: false;
    statusCode: number;
    message: string;
    errors?: unknown;
    stack?:string 
}