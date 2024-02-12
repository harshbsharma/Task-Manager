import connectMongoDB from "@/config/database";
import { authMiddleware } from "@/middlewares/serverauth";
import Topic from "@/models/Topic";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


interface CustomNextRequest extends NextRequest {
    context?: { userId?: string }; // Add the context property
}

export async function DELETE(request: CustomNextRequest,response:NextResponse<ResponseType>): Promise<NextResponse> {
    try {
        const authResult = await authMiddleware(request);
        
        if (authResult instanceof NextResponse) {
            return authResult; // Return unauthorized response
        }
        await connectMongoDB();
        const userId  = request.context?.userId;
        const {taskid} = await request.json() as {taskid:string};


        await Topic.findByIdAndDelete(taskid);

        const user = await User.findByIdAndUpdate(userId,{
            $pull:{
                topics:taskid
            }
        })

        return NextResponse.json({ message: 'Deleted Task Succesfully' }, { status: 201 });
    } catch (error) {
        console.error('Error Deleting topic:', error);
        return new NextResponse(JSON.stringify({message:"UnSuccesfull"}));
    }
}
