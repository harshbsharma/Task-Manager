import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import  RequestCookies  from 'next/types'; // Import RequestCookies type

// Define your JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

interface CustomNextRequest extends NextRequest {
    context?: { userId?: string }; // Add the context property
}

// Middleware function to extract user ID from JWT token in cookies
export async function authMiddleware(req: CustomNextRequest) {
    // Initialize req.context if not already initialized
    if (!req.context) {
        req.context = {};
    }
    console.log("auth midle");
    // Extract token from cookies
    const token = req.cookies.get('jwt');
    console.log(token);
    if (token) {
        try {
            // Decrypt JWT token to get user ID
            const decoded = jwt.verify(token.value as unknown as string,JWT_SECRET as string) as JwtPayload;
            console.log(decoded);
            const userId = decoded.id;

            // Set user ID in request context for later use
            req.context.userId = userId;
            return; 
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            // Clear user ID in case of error to avoid potential security risks
            delete req.context.userId;
        }
    } else {
        delete req.context.userId;
    }

    return NextResponse.json('Unauthorized',{status:401})
}
