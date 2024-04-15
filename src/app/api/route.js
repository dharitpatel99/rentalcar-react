import { NextResponse } from "next/server";
import { connectDB } from "../../config/db";

connectDB()
export async function GET(){
    return NextResponse.json({data:"Home Route"},{status:200})
}