import connectMongoDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken";

interface LoginResponse{
    success:boolean,
    message:string,
    token?:string,
    user?:any
}

export async function POST(req:NextRequest,res:NextResponse<LoginResponse>) {
    try
    {
        const JWT  = process.env.JWT_SECRET as string
        await connectMongoDB();
        const { email,password } = await req.json() as { email:string,password:string };
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return NextResponse.json({success:false,messag:"Please Fill up All the Required Fields"})
        }
        
        const user = await UserModel.findOne({email:email});
        if(!user)
        {
            return NextResponse.json({success:false,messag:"no such user exist"});
        }

        if(await bycrypt.compare(password,user.password))
        {
            const token =  jwt.sign(
                {email:user.email,id:user.id,},
                JWT,{
                    expiresIn:"24h"
                }
            )
            const cookie = `jwt=${token}; HttpOnly; Max-Age=3600;`; 
            return NextResponse.json(
                {success:true,message:"Login Succesful",token:token,user:user},
                {headers:{'Set-Cookie':cookie}}
                )
        }
        else{
            return NextResponse.json({success:false,messag:"Incorrect Password"});
        }

        
    }
    catch(err)
    {
        return NextResponse.json({success:false,messag:"Unable to login"});
    }
}