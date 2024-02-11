"use client"

import React, { FormEventHandler, useEffect, useState } from "react"
import { Modal } from "./ui/modal"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"

interface AlertModalProps {
    taskid:string
    title:string
    description:string
    isOpen:boolean
    onClose:()=>void
    onConfirm:()=>void
    loading:boolean
}

export const AlertModal:React.FC<AlertModalProps> = ({
    taskid,
    title,
    description,
    isOpen,
    onClose,
    onConfirm,
    loading,
})=>{
    const [id,setid] = useState(taskid);
    const [isMounted,setIsMounted] = useState(false)
    const [tasktitle, setTaskTitle] = useState<string>(title);
    const [taskdesc, setTaskDesc] = useState<string>(description);
    const onDelete = ()=>{
        console.log("delete");
    }
    const router  = useRouter();
    const handleSubmitEditTodo:FormEventHandler<HTMLFormElement>= async (e) => {
        // e.preventDefault();
        console.log(tasktitle)
        console.log(taskdesc)
        console.log(id);
        const data = {taskid:id,title:tasktitle,description:taskdesc};
        const update = await axios.patch('/api/topic/update',data);
        console.log(update);
        onClose();
        router.push('/task');
      };
    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted)
    {
        return null
    }

    return(
        <Modal
        title="Edit Title and Description"
        description="Change the title and description as per your need"
        isOpen={isOpen}
        onClose={onClose}
        >
            <form onSubmit={handleSubmitEditTodo}>
        
                        <h3 className='font-bold text-lg'>Edit task</h3>
                        <div className='flex flex-col modal-action gap-y-2'>
                        <Input
                            value={tasktitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            type='text'
                            placeholder='Type here'
                            className='input input-bordered w-full'
                        />
                        <Input
                            value={taskdesc}
                            onChange={(e) => setTaskDesc(e.target.value)}
                            type='text'
                            placeholder='Type here'
                            className='input input-bordered w-full'
                        />
                        {/* <button type='submit' className='btn'>
                            Submit
                        </button> */}
                        </div>
                        <div
                        className="pt-6 space-x-2 flex items-center
                        justify-end w-full"
                        >
                            {/* <Button
                            disabled={loading}
                            variant='outline'
                            onClick={onClose}
                            >
                                Cancel
                            </Button> */}
                            <Button
                            disabled={loading}
                            variant='default'
                            type="submit"
                            >
                                Continue
                            </Button>
                        </div>
     

            </form>
        </Modal>
    )
}