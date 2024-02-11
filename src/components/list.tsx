import formatDate from '@/config/date';
import React, { FormEventHandler, useState } from 'react'
import { Button } from './ui/button';
import { useStoreModal } from '@/hooks/modal';
import { AlertModal } from './AlterModal';
import { StoreModal } from './UpdateModal';
// import Modal from './simplemodal';
import {Modal} from './ui/try-modal';
import { DeleteModal } from './confirm-modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CardData{
    data:any
}

const List:React.FC<CardData> = ({data}) => {

    const [task,settask] = useState<CardData>(data);
    console.log(task);
    // console.log(data);
    const time = formatDate(data.createdAt);
    const [open,setopen] = useState(false);
    const [tasktitle,settasktitle] = useState(data?.title)
    const [taskdesc,settaskdesc] = useState(data?.description)
    const router = useRouter();

    const handleSubmitEditTodo= async ()=>{
        // e.preventDefault();
        console.log(tasktitle)
        console.log(taskdesc);
        const formdata = {taskid:data._id,title:tasktitle,description:taskdesc};
        const update = await axios.patch('/api/topic/update',formdata);
        console.log(update);
        // settasktitle(update.data.Task.title);
        // settaskdesc(update.data.Task.description);
        settask(update.data.Task);
        // console.log(update);
        router.refresh();
        setopen(false);
    }


  return (
    <div>
        
        <Modal
        title="Hello"
        description='Heeeelfs'
        isOpen ={open}
        onClose={setopen}

        >

       
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input
                value={tasktitle}
                onChange={(e) => settasktitle(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <input
                value={taskdesc}
                onChange={(e) => settaskdesc(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <Button onClick={handleSubmitEditTodo} variant='destructive'>
                Submit
              </Button>
              <Button onClick={()=>setopen(false)} >
                Cancel
              </Button>
            </div>


        </Modal>

        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    className="h-56 w-full object-cover"
                />

            <div className="bg-white p-4 sm:p-6 flex justify-between">
                {/* <time datetime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time> */}

                <div>
                <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">{tasktitle}</h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {taskdesc}
                </p>
                
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {time}
                </p>
                </div>
                <div> 
                    <Button onClick={()=>setopen(true)}>
                        Edit
                    </Button>
                    <Button onClick={()=>{}}>
                        Delete
                    </Button>
                </div>

            </div>
        </article>
    </div>
  )
}

export default List