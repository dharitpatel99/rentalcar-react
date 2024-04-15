import { connectDB } from "@/config/db";
import { validJWTToken } from "@/helpers/tokenValidation";
import Booking from "@/models/bookingModels"
import { NextResponse } from "next/server";

connectDB();


export async function POST(request){

    try{
        const userId = await validJWTToken(request);
        const reqBody = await request.json();
        await Booking.create(reqBody);

        return NextResponse.json({
            message:"Car booked successfully",
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
        await validJWTToken(request);
        const {searchParams} = new URL(request.url)
        const user = searchParams.get("user");
        const filter = {};
        if(user){
            filter.user=user;
        }
        const bookings = await Booking.find(filter).populate("car").populate("user");
        console.log(bookings);

        return NextResponse.json({
            data:bookings
        })

    }catch(error){
        return NextResponse.json({
            message:error.message
        },{
            status:400,
        });
    }
}

