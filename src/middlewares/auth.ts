'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuthMiddleware = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // User is not logged in, redirect to login page
            router.push('/login');
        }
    }, []);

    return null;
};

export default useAuthMiddleware;
