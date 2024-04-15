import { NextResponse } from "next/server";
import {connectDB} from "@/config/db"
import {validJWTToken} from "@/helpers/tokenValidation"
import Car from "@/models/carModels"


export async function GET(request,{params}){

    try{

        const userId = await validJWTToken(request);
        const car = await Car.findById(params.carid);

        return NextResponse.json({data:car});

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}



export async function PUT(request){

    try{
        const userId = await validJWTToken(request);
        const reqBody = await request.json();
        await Car.findByIdAndUpdate(reqBody._id,reqBody);

        return NextResponse.json({
            message:"Car updated Succesfully"
        })

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}

export async function DELETE(request,{params}){

    try{
        const userId = await validJWTToken(request);
        console.log(params.carid);
        await Car.findByIdAndDelete(params.carid);

        return NextResponse.json({
            message:"Car deleted Succesfully"
        })

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}