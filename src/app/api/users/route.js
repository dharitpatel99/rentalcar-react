import { connectDB } from "@/config/db";
import { validJWTToken } from "@/helpers/tokenValidation";
import User from "@/models/userModels"
import { NextResponse } from "next/server";

connectDB();

export async function GET(request){

    try{
        await validJWTToken(request);
        const user = await User.find({});

        return NextResponse.json({
            data:user
        })

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}