import { NextResponse } from "next/server";
import User from"@/models/userModels";
import {connectDB} from "@/config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();
export async function POST(request){
    try{

        const reqBody = await request.json();
        console.log(reqBody);

        //check if user already exist
        const user = await User.findOne({email:reqBody.email});
        if(!user){
            throw new Error("user not found")
        }

        //check if password is correct
        const validPass = await bcrypt.compare(reqBody.password,user.password);
        if(!validPass){
            throw new Error("Invalid password")
        }

        const response = NextResponse.json({
            message:"Login Successfully",
        });

        //create token
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

        //set cookie
        response.cookies.set("token",token,{
            path:"/",
            httpOnly:true,

        })

        return response;
     }catch(error){
        return NextResponse.json({
            message:error.message,
        },{status:400})
     }
} 