'use client'
import {useState,useEffect} from "react"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormField, FormItem, FormLabel,FormControl,FormMessage, FormDescription } from "./ui/form"
import { Checkbox } from "./ui/checkbox"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    title: z.string().min(1),
    description:z.string().min(5).max(500),
    pending:z.boolean().default(true)
})

export function CardWithForm() {
  const router = useRouter();
    // const [formData,setformData] = useState({
    //     title:"",
    //     description:""
    // })
    const [loading,setloading] = useState(false);
    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description:"",
            pending:true
        }
    })

    const formhandler = async (data: z.infer<typeof formSchema>)=>{
        console.log(data);
        const response = await axios.post("/api/topic",data);
        // console  .log(response);
        router.push("/task")

    }
    
  return (
    <Card className="w-[1/2] max-sm:mx-2 md:w-[350px] lg:w-[450px]">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Add Task that you want to do</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form> */}

        <Form {...form}>
                <form onSubmit={form.handleSubmit(formhandler)}>
                   <div className="flex flex-col gap-y-4">
                   <FormField
                    control={form.control}
                    name='title'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Coding...' {...field}/>
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
                                <Input disabled={loading} placeholder='To code from morning to evening' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />

                <FormField
                    control={form.control}
                    name="pending"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            Pending
                            </FormLabel>
                            <FormDescription>
                            Mark this to make this task pending
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                    />
                   </div>

                    <div className='pt-6 space-x-2 flex items-center justify-end w-full '>
                        

                        <Button
                            disabled={loading} 
                            variant='destructive'
                            
                        >
                            Cancel
                        </Button>

                        <Button 
                            disabled={loading} 
                            type='submit'
                        >
                            Continue
                        </Button>
                    </div>
                    {/* <div className="flex justify-between pt-6">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </div> */}

                </form>
            </Form>


      </CardContent>
      <CardFooter className="flex justify-between">
        
      </CardFooter>
    </Card>
  )
}
