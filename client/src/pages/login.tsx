import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  Button,
  Card,
  Input,
} from '@nextui-org/react';

import { useAuth } from '../components/contexts/Auth-Context';
import apikey from '../pages/api/apikey';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

interface ResponseProps {
  data: {
    message: string;
    status: number;
    data?: any;
  };
}

export default function Login() {
  const { toggleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const SetErrorEmpty = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setError("");
  };
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("login");
    e.preventDefault();
    console.log(`email: ${email}, password: ${password}`);
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      SetErrorEmpty();
    } else {
      const result = FormSchema.safeParse({ email, password });
      if (!result.success) {
        setError("Invalid email or password");
        SetErrorEmpty();
      } else {
        const response: ResponseProps = await axios.post(apikey + "/login", {
          email,
          password,
        });
        console.log(response.data);
        const messageResponse: string = response?.data?.message || "";
        if (messageResponse.includes("logged in successfully")){
          setError(response?.data?.message || " ");
          toggleLogin();
          SetErrorEmpty();
          console.log("about to navigate")
          navigate("/home");
        }
      }
    }
  };

  return (
    <Card className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-4">
          Login to MuzzPlayer
        </h1>

        <form className="space-y-6" onSubmit={login}>
          <div className="flex items-center">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
            />
          </div>

          <div className="flex items-center">
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              required
            />
          </div>

          <Button color="primary" type="submit">
            {" "}
            Login{" "}
          </Button>

          <p className="text-center text-red-500">&nbsp; {error} &nbsp;</p>
        </form>
      </div>
    </Card>
  );
}
