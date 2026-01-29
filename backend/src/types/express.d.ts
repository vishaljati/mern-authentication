import { IUser } from "../types/userModel.types.ts";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
