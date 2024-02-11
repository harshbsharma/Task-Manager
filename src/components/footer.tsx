import Link from 'next/link'
import React from 'react'
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='mt-10 mb-5 '>
        <div className="text-center">
    <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
        <img src="https://www.svgrepo.com/show/499962/music.svg" className="h-12 mr-3 sm:h-9" alt="Landwind Logo"/>
		Harsh Sharma
    </a>

    {/* <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2021-2022 Landwind™. All Rights Reserved.
		Built with 
        <a href="https://flowbite.com"
			className="text-purple-600 hover:underline dark:text-purple-500">Flowbite</a> and 
            <a
			href="https://tailwindcss.com" className="text-purple-600 hover:underline dark:text-purple-500">Tailwind
			CSS
        </a>.
	</span> */}

    <ul className="flex justify-center mt-6 space-x-10 ">
        
        
       
        <li>
            <Link href='https://github.com/harshbsharma'>
                <BsGithub size={50} />
            </Link>
        </li>
        <li>
            <Link href='https://www.linkedin.com/in/harshbsharma/'>
                <FaLinkedinIn size={50} />
            </Link>
        </li>
       
    </ul>
</div>
    </div>
  )
}

export default Footer