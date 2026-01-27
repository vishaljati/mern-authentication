import { Schema, model ,InferSchemaType } from "mongoose";
import { type IUser } from "../types/model_types/user.types.js"

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        mobile_no: {
            type: Number,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
)

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model<UserDocument>("User", userSchema);