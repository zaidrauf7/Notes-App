import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, Form, Formik } from 'formik'
import '../globals.css'
import { account } from '@/appwrite/config'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
        const result = await account.createEmailPasswordSession(
            data?.email,
            data?.password,
        )
        console.log(result);
        setLoading(false);
              toast({
                variant: "success",
                description: "Login successfully.",
              });
              setTimeout(() => {
                navigate("/");
              }, 1000);
    } catch (error) {
        toast({
            variant: "destructive",
            description: "Something went wrong.",
          });
        console.log(error);
        setLoading(false);
        
    }
  }


  return (
    <div className="flex flex-col bg-img  justify-center items-center h-screen ">
    <div className="w-[320px] sm:w-[400px]   shadow-lg p-8 rounded-xl ">
     <h1 className="text-center mb-4 text-xl font-bold text-white">Login</h1>
     <Formik
  initialValues={{ email: "", password: "" }}
  onSubmit={onSubmit}
>
  <Form className="flex flex-col gap-8">
    <Field as={Input} name="email" type="email" placeholder={"Email"} />
    <Field
      as={Input}
      name="password"
      type="password"
      placeholder={"Password"}
    />
     <Link to={"/signup"} className="cursor-pointer text-white font-semibold">
              Register Your Account
            </Link>
    <Button type="submit" disable={loading} className="w-full">
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Submit
    </Button>
  </Form>
</Formik>
</div>
</div>
  )
}

export default Login