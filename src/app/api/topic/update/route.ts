import connectMongoDB from "@/config/database";
import { authMiddleware } from "@/middlewares/serverauth";
import Topic from "@/models/Topic";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


interface CustomNextRequest extends NextRequest {
    context?: { userId?: string }; // Add the context property
}

export async function PATCH(request: CustomNextRequest,response:NextResponse<ResponseType>): Promise<NextResponse> {
    try {
        const authResult = await authMiddleware(request);
        
        if (authResult instanceof NextResponse) {
            return authResult; // Return unauthorized response
        }
        const userId  = request.context?.userId;
        const {taskid,title,description,pending} = await request.json() as {taskid:string,title:string,description:string,pending:boolean};

        await connectMongoDB();
        const task = await Topic.findById(taskid);

        if(task?.user?._id!=userId)
        {
            return NextResponse.json("This is not your taks",{status:401});
        }

        const UpdatedTask = await Topic.findByIdAndUpdate(task?._id,{
            title:title,
            description:description,
            pending:pending
        },{new:true}).populate('user').exec();

        return NextResponse.json({ message: 'Updated Task Succesfully',Task:UpdatedTask }, { status: 201 });
    } catch (error) {
        console.error('Error Updating topic:', error);
        return new NextResponse(JSON.stringify({message:"UnSuccesfull"}));
    }
}
