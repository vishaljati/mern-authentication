import { Schema, model, InferSchemaType } from "mongoose";
import { type IUser } from "../types/userModel.types.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


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
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

type UserDocument = InferSchemaType<typeof userSchema>;

// Encrypting password when user modify the password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    if (!this.password) {
        throw new Error("Password is required");
    }
    const SALT_ROUNDS = 12;
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

//Comapre with hashing password
userSchema.methods.isPasswordCorrect = async function (password:string):Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

//Generating JWT Tokens
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            mobile_no: this.mobile_no || null
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: "1d"
        }

    )
}
userSchema.methods.generateRefreshToken = function ():string {
    return jwt.sign(
        {   
            _id:this._id,
            username:this.username

        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn:"7d" 
        }
    )
}


export const User = model<UserDocument>("User", userSchema);