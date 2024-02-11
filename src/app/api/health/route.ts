
import connectMongoDB from "@/config/database";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:Request,res:Response)
{
    try{
        const client  = await connectMongoDB();
        console.log(client);
        return new NextResponse(JSON.stringify({message:"Healthy"}),{status:200});
    }
    catch(err)
    {
        console.log(err);
    }
}