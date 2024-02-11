'use client'
import Card from '@/components/cad';
import List from '@/components/list';
import { useTokenStore } from '@/hooks/auth'
import useAuthMiddleware from '@/middlewares/auth';
import axios from 'axios';
import {useEffect,useState} from 'react'

const Task = () => {
    useAuthMiddleware();
    const {token,setToken} = useTokenStore();
    const [tasks,setTasks] = useState([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
        const jwt= localStorage.getItem('token');
        setToken(jwt as string);
        }

        const fetcher = async ()=>{
            const data = await axios.get('/api/topic');
            // const tasks= data.json();
            console.log(data.data.topic);
            setTasks(data.data.topic);
        }
        fetcher();
    },[]);



  return (
    <div className='grid grid-cols-3 gap-x-4 max-sm:grid-cols-2 mx-2 py-4 gap-y-3'>
        {tasks.map((item)=>(
            <Card key={item}  data={item}/>
            // <List key={item} data={item}/>
        ))}
    </div>
  )
}

export default Task