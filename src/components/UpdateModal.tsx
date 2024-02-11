"use client"
import * as z from 'zod'
import { useStoreModal } from '@/hooks/modal';
import {Modal} from './ui/modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem,
     FormLabel, 
     FormMessage
    } from './ui/form';

import { Input } from './ui/input';  
import { Button } from './ui/button';
import { use, useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation"

const formSchema = z.object({
    title: z.string().min(1),
    description:z.string().min(5).max(500),
    pending:z.boolean()
})


interface StoreModalProps {
    title:string,
    description:string
    pending:boolean
}

export const StoreModal:React.FC<StoreModalProps>=({title,description,pending})=>
{

    const storeModal = useStoreModal();
    const router = useRouter();
    const[loading, setLoading] = useState(false);   

    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title,
            description:description,
            pending:pending
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {   
        console.log(data);
        try{
            setLoading(true);
            const response  = await axios.post('/api/stores', data);
            
            // router.push(`/${response.data.id}`)           
            window.location.assign(`/${response.data.id}`) 
            // You can try window.location.assign(`/${response.data.id}`) 
            // if router.push doesn't work
        }
        catch(err)
        {
            
        }
        finally{
            setLoading(false);
        }
    }

    
    return(
    <Modal 
    title="Create Store"
    description="Add new store to manage product and caetgories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
    <div>
    
        <div className='space-y-4 py-2 pb-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name='title'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='E-commerce' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='description'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='E-commerce' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />

                    <div className='pt-6 space-x-2 flex items-center justify-end w-full '>
                        
                        <Button 
                            disabled={loading} 
                            type='submit'
                        >
                            Continue
                        </Button>

                        <Button
                            disabled={loading} 
                            variant='destructive'
                            onClick={storeModal.onClose}
                        >
                            Cancel
                        </Button>

                    </div>

                </form>
            </Form>
        </div>
    </div>
    </Modal>
    )
}