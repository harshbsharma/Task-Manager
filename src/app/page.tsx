'use client'
// import Navbar from "@/components/navbar";
import { useTokenStore } from "@/hooks/auth";
import Image from "next/image";
import { useEffect } from "react";

import Lottie from "lottie-react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import animation3 from "@/assets/animation.json"
export default function Home() {

  const {token,setToken} = useTokenStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const jwt= localStorage.getItem('token');
        setToken(jwt as string);
      }
  }, []);

  
  return (
    <div className="max-sm:pt-5 w-full max-sm:grid-row-5 pt-20 mt-20 flex flex-col items-center overflow-x-hidden">
        {/* <h1 classNameName="max-sm:text-6xl max-sm:pl-2 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
    Welcome To
  </h1>
  <h1 classNameName="max-sm:text-6xl max-sm:pl-2 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
    Task Manager
  </h1> */}
  <h1 className="text-4xl max-sm:grid max-sm:place-items-center font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-5xl md:text-6xl p-6">
    <span className="ml-1">
       Welcome To &nbsp;
    </span>
    <span className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Task Manager &nbsp;
        </span>
    </h1>
      {/* <Navbar/> */}
      <Lottie animationData={animation3}
            
            className=''/>
    </div>
  );
}
