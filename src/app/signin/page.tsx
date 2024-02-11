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
import { Form,FormField, FormItem, FormLabel,FormControl,FormMessage, FormDescription } from "@/components/ui/form"
// import { Checkbox } from "./ui/checkbox"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    firstname:z.string().min(2),
    lastname:z.string().min(2),
    email: z.string().email('Invalid Email Address'),
    password:z.string().min(4),
})


export default function SignIn() {
  const router = useRouter();
    // const [formData,setformData] = useState({
    //     title:"",
    //     description:""
    // })
    const [loading,setloading] = useState(false);
    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname:"",
            lastname:"",
            email: "",
            password:"",
        }
    })

    const formhandler = async (data: z.infer<typeof formSchema>)=>{
        console.log(data);
        // const response = await axios.post("/api/topic",data);
        // // console  .log(response);
        // router.push("/task")
        const response = await axios.post('/api/signup',data);
        console.log(response);
        router.push('/')

    }
    
  return (
    <div className="h-full w-full mt-16 justify-center items-center flex max-sm:mt-20">
        <Card className="w-[1/2] max-sm:mx-2 md:w-[350px] lg:w-[450px]">
      <CardHeader>
        <CardTitle>SignUp Here</CardTitle>
        <CardDescription>Sign Up to manage your daily todo task</CardDescription>
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
                    name='firstname'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Firstname
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Freddy' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />
                     <FormField
                    control={form.control}
                    name='lastname'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Lastname
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Brook' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />
                   <FormField
                    control={form.control}
                    name='email'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input type='email' disabled={loading} placeholder='name@company.com' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='password'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='*****' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />

               
                   </div>

                    <div className='pt-6 space-x-2 flex items-center justify-between w-full '>
                        <div>
                            Already A User?&nbsp; <a href="/login" className="text-bold underline">Login</a>
                        </div>

                        <div>
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
    </div>
  )
}
