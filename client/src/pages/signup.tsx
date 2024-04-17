import React, { useState } from "react";
import {Button, Card, Input} from "@nextui-org/react";
import {z} from "zod";
import apikey from "../pages/api/apikey";
import axios from "axios";
interface ResponseProps{
    data: {
      message:string
      status:number
      data?:any
    }
  }
const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20, {message: "Password must be between 5 and 20 characters"}),
    confirmPassword: z.string().min(5).max(20, {message: "Password must be between 5 and 20 characters"}),
});
export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const SetErrorEmpty = async(): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setError("");
    }
    const signup = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form submitted->1")
        if (email === "" || password === "" || confirmPassword === "") {
            setError("Please fill in all fields");
            SetErrorEmpty();
        } else if (password !== confirmPassword) {
            console.log("password mismatch->2.1")
            setError("Passwords do not match");
            SetErrorEmpty();
        } else {
            const result = FormSchema.safeParse({email, password, confirmPassword});
            if (!result.success) {
                console.log("form parsing failed->3.1")
                setError('Proper email not given or password is not between 5 and 20 characters');
                SetErrorEmpty();
            } else {
                console.log("form parsed->3.2")
                const response:ResponseProps = await axios.post(apikey+"/signup",{email,password})
                console.log(response)
                setError("Signup successful");
                SetErrorEmpty();
            }
        }
    }

    return (
        <Card className="flex justify-center items-center h-screen"> 
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"> 
            <h1 className="text-2xl text-center font-bold mb-4">Signup For MuzzPlayer</h1> 
                <form className="space-y-6" onSubmit={signup}> 
                    <div className="flex items-center"> 
                        <Input type="email" id="email" label='Email' name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  /> 
                    </div> 
                    <div className="flex items-center"> 
                        <Input type="password" id="password" label='Password' name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}  /> 
                    </div> 
                    <div className="flex items-center"> 
                        <Input type="password" id="confirmPassword" label='Confirm Password' name="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  /> 
                    </div> 
                    <Button type="submit" color="primary"> Signup </Button>
                 </form> 
                <p className="text-center text-sm text-red-500">&nbsp; {error} &nbsp;</p>
            </div>
        </Card>
    );
}