import  connectMongoDB  from '@/config/database';
import { authMiddleware } from '@/middlewares/serverauth';
import Topic, {TopicDocument} from '@/models/Topic';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

interface ResponseType{
    success:boolean,
    message:string,
    topic?:any,
}

interface CustomNextRequest extends NextRequest {
    context?: { userId?: string }; // Add the context property
}


export async function POST(request: CustomNextRequest,response:NextResponse<ResponseType>): Promise<NextResponse> {
    try {
        const authResult = await authMiddleware(request);

        if (authResult instanceof NextResponse) {
            return authResult; // Return unauthorized response
        }
            const userId  = request.context?.userId;
        const { title, description,pending } = await request.json() as { title: string; description: string,userId:string,pending:boolean};

        const client=await connectMongoDB();

        const user = await User.findById(userId);

        if(!user)
        {
            return new NextResponse(JSON.stringify({message:"Unable to find the User"}));   
        }


        // const topic  = await Topic.create({ title, description });

        const topic = await Topic.create({
            title,description,user:user._id,pending:pending
        })

        await User.findByIdAndUpdate({_id:userId},
            {
                $push:{
                    topics:topic._id
                }
            },{new:true});

        return NextResponse.json({ message: 'Topic Created',topic:topic }, { status: 201 });
    } catch (error) {
        console.error('Error creating topic:', error);
        return new NextResponse(JSON.stringify({message:"UnSuccesfull"}));
    }
}

// export async function GET(): Promise<NextResponse> {
//     try {
//         await connectToDatabase();
//         const topics: TopicDocument[] = await Topic.find();
//         return NextResponse.json({ topics });
//     } catch (error) {
//         console.error('Error fetching topics:', error);
//         return NextResponse.error('Internal Server Error', { status: 500 });
//     }
// }

// export async function DELETE(request: NextRequest): Promise<NextResponse> {
//     try {
//         const id = request.nextUrl.searchParams.get('id');
//         await connectMongoDB();
//         await Topic.findByIdAndDelete(id);
//         return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting topic:', error);
//         return NextResponse.error('Internal Server Error', { status: 500 });
//     }
// }

// export async function GET(req:NextRequest,res:NextResponse<ResponseType>):Promise<NextResponse>
// {
//     try{
//         console.log(1);
//         await connectMongoDB();
//         console.log(1);
//         const { userId } = await req.json() as { userId: string};
//         console.log(1);
//         const user = await User.findById(userId);
//         console.log(1);
//         if(!user)
//         {
//             return new NextResponse(JSON.stringify({success:false,message:"No Such User Exists"}));
//         }
//         const tasks = await Topic.findById({user:userId});
//         return new NextResponse(JSON.stringify({success:true,topic:tasks}));
//     }
//     catch(err)
//     {
//         return new NextResponse(JSON.stringify({success:false,message:"Unable to get the tasks"}));
//     }
// }


export async function GET(request: CustomNextRequest,response:NextResponse<ResponseType>): Promise<NextResponse> {
    try {
        const authResult = await authMiddleware(request);

    if (authResult instanceof NextResponse) {
        return authResult; // Return unauthorized response
    }
        const userId  = request.context?.userId;
        console.log(userId);
        
        const client=await connectMongoDB();
        console.log(1)
        
        const user = await User.findById(userId);
        console.log(1)

        if(!user)
        {
            return new NextResponse(JSON.stringify({message:"Unable to find the User"}));   
        }
        
        const tasks = await Topic.find({user:userId}); 

        return NextResponse.json({success:true,topic:tasks});
    } catch (error) {
        console.error('Error creating topic:', error);
        return new NextResponse(JSON.stringify({message:"UnSuccesfull"}));
    }
}
