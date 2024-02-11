import connectMongoDB from '@/config/database';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Define types for request and response objects
interface CreateUserRequest {
    firstname: string;
    lastname: string;
    email: string;
}

interface CreateUserResponse {
    success: boolean;
    message: string;
    user?:any
    error?:any
}

export async function POST(req: NextRequest, res: NextResponse<CreateUserResponse>) {

    // Extract firstname, lastname, and email from request body
    const client  = await connectMongoDB()
    const { firstname, lastname,email,password } = await req.json() as { firstname: string; lastname: string,email:string,password:string};
    if(!firstname || !lastname || !email ||!password)
    {
        return new NextResponse(JSON.stringify({success:"False",message:"Require All Fields"}));
    }
    try {
        // Create a new user with the provided details
        const existingUser = await User.findOne({email:email});
        if(existingUser)
        {
            return new NextResponse(JSON.stringify({success:"False",message:"User Already Present"}));
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({ firstname, lastname, email,password:hashedPassword });
        console.log(newUser);
        return new NextResponse(JSON.stringify({user:newUser}),{status:200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Failed"}),{status:404});
    }
}
