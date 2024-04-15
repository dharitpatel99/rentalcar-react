import { NextResponse } from "next/server";
import {connectDB} from "@/config/db"
import {validJWTToken} from "@/helpers/tokenValidation"
import Car from "@/models/carModels"

connectDB();

export async function POST(request){
    console.log("mknss");

    try{
        const userId = await validJWTToken(request);
        console.log(userId);
        const reqBody = await request.json();
        console.log(reqBody);

        reqBody.addedBy = userId;

        const car = await Car.create(reqBody);
        console.log(car);

        return NextResponse.json({
            message:"Car added successfully",
            car
        })

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}

export async function GET(request){

    try{
        const userId = await validJWTToken(request);
        const cars = await Car.find();

        return NextResponse.json({
            data:cars
        })

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}