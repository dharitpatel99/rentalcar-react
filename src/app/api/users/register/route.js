import { NextResponse } from "next/server";
import User from"@/models/userModels";
import {connectDB} from "@/config/db"
import bcrypt from "bcryptjs";
connectDB();
export async function POST(request){
    try{

        const reqBody = await request.json();
        console.log(reqBody);

        //check if user already exist
        const userExists = await User.findOne({email:reqBody.email});
        if(userExists){
            throw new Error("user Already exists")
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(reqBody.password,salt);
        reqBody.password = hashedPass;
        console.log(salt);


        //create user
        await User.create(reqBody);  
        
        return NextResponse.json({
            message:"User created Successfully",
        });
     }catch(error){
        return NextResponse.json({
            message:error.message,
        },{status:400})
     }
} 