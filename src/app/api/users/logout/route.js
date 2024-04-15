import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({
            data:null,
            message:"user loggged out Successfully",
        },
        {status:200});

        response.cookies.delete("token")
        return response;

    }catch(error){
        return NextResponse.json(
            {
                data:null,message:error.message
            },
            {
                status:500
            }
        )

    }
}