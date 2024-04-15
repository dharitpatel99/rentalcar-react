import { NextResponse } from "next/server";
import {connectDB} from "@/config/db"
import {validJWTToken} from "@/helpers/tokenValidation"
import User from "@/models/userModels";

connectDB();

export async function GET(request){
    try{
        const userId = await validJWTToken(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({
            data:user,
            message:"current user fetched successfully"
        },{
            status:200
        })

    }catch(error){
        return NextResponse.json({
            data:null,
            message:error.message,
        },{
            status:500,
        });
    }
}