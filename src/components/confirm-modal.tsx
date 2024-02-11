"use client"

import React, { FormEventHandler, useEffect, useState } from "react"
import { Modal } from "./ui/modal"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"


interface AlertModalProps {
    taskid:string
    isOpen:boolean
    onClose:()=>void
    onConfirm:()=>void
    loading:boolean
}

export const DeleteModal:React.FC<AlertModalProps> = ({
    taskid,
    isOpen,
    onClose,
    onConfirm,
    loading,
})=>{
    const [isMounted,setIsMounted] = useState(false)
    const router  = useRouter();

    const deletehandler:FormEventHandler<HTMLFormElement> = async (e) => {
        // e.preventDefault();
        console.log(taskid);
        await axios.delete('/api/topic/delete', {
            data: {
                taskid: taskid
            }
        });
        onClose();
        router.refresh();
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
        title="Are You Sure?"
        description="This action cannot be undone"
        isOpen={isOpen}
        onClose={onClose}
        >
            <form onSubmit={deletehandler}>

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
                    variant='destructive'
                    type="submit"
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Modal>
    )
}