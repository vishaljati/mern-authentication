import { type Request, type Response } from "express"
import { AsyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const registerUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        if (!username || !password) {
            throw new ApiError(400, "Username and Password is required")
        }
        if (!email) {
            throw new ApiError(400, "Email is required")
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            throw new ApiError(409, "Username or Email already exists")
        }

        const newUser = await User.create({
            username: username.toLowerCase(),
            email,
            password
        })
        const createdUser = await User.findById(newUser._id).select("-password -refreshTokens")
        if (!createdUser) {
            throw new ApiError(500, "User creation failed in DB")
        }

        //NOTE:Sending registration mail
        return res.status(201).json(
            new ApiResponse
                (201, "User registered successfully", createdUser).toJSON())
    } catch (error) {
        console.error("Something went wrong while registering user", error)
        return
    }


})

export { registerUser }