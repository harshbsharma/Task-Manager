import formatDate from '@/config/date';
import React, { FormEventHandler, useState } from 'react'
import { Button } from './ui/button';
import { useStoreModal } from '@/hooks/modal';
import { AlertModal } from './AlterModal';
import { StoreModal } from './UpdateModal';
// import Modal from './simplemodal';
import {Modal} from './ui/modal';
import { DeleteModal } from './confirm-modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";

interface CardData{
    data:any
}

const Card:React.FC<CardData> = ({data}) => {
    // console.log(data);
    const time = formatDate(data.createdAt);
    const storemodal = useStoreModal();
    const edithandler = (id:string)=>{
        console.log(id);
        storemodal.onOpen();
    }

    const [deleteopen,setdeleteopen] = useState(false);
    const router = useRouter();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [tasktitle, setTaskTitle] = useState<string>(data.title);
    const [taskdesc, setTaskDesc] = useState<string>(data.description);
    const onDelete = ()=>{
        console.log("delete");
        console.log(data._id);
    }

    const[deleteloading,setdeleteloading] = useState(false);

    const onTaskDelete= async ()=>{
        // console.log(data._id)
        // // const deldata = {taskid:data._id}
        // await axios.delete('/api/topic/delete', {
        //     data: {
        //         taskid: data._id
        //     }
        // });
        // setdeleteopen(false);
        // router.refresh();
        console.log("here del")
    }

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        
      };

  return (
    <div>

        <DeleteModal
        taskid={data._id}
        isOpen={deleteopen}
        onClose={()=>setdeleteopen(false)}
        onConfirm={onTaskDelete}
        loading={deleteloading}
        />

        <AlertModal
        pending={data?.pending}
        taskid={data?._id}
        title={data.title}
        description={data.description}
        isOpen={open}
            onClose={()=>Setopen(false)}
            onConfirm={onDelete}
            loading={loading}
        />

       

<article className="dark:text-white border border-black
hover:scale-105 transition-all duration-300 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700
rounded-lg shadow hover:shadow-lg bg-white overflow-hidden">
      <div className="p-4 sm:p-6 flex flex-col h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <a className='flex items-center gap-x-2'>
              <h3 className="text-lg font-semibold ">{data?.title}</h3>
              {!data.pending ? (<FaCheckCircle size={20} color='green'/>): (<MdOutlinePendingActions size={20} color='red'/>)}
            </a>
            <p className="mt-2 text-sm  line-clamp-3">{data?.description}</p>
            <p className="mt-2 text-sm ">{time}</p>
          </div>
          <div className="flex items-center justify-between pt-4">
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <FaEdit className="mr-1" />
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              <MdDelete className="mr-1" />
              Delete
            </button> */}
             <Button variant='default' onClick={() => Setopen(true)}>
                <FaEdit />
             </Button>
            <Button className="" onClick={() => setdeleteopen(true)}>
                <MdDelete color="red" />
            </Button>
          </div>
        </div>
      </div>
    </article>
    {/* <div className="flex justify-end mt-auto">
          <Button onClick={() => Setopen(true)}>
            <FaEdit />
          </Button>
          <Button className="bg-transparent" onClick={() => setdeleteopen(true)}>
            <MdDelete color="red" />
          </Button>
        </div> */}
    </div>
  )
}

export default Card