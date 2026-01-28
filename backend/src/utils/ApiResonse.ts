import { type ApiSuccess } from "../types/Api.types.js";

export class ApiResponse<T> {
    constructor(
        public readonly success: true,
        public readonly statusCode: number,
        public readonly message: string,
        public readonly data?: T,
    ) {}

    toJSON(): ApiSuccess<T> {
        return {
            success: true,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
        };
    }

}