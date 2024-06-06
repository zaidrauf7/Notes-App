import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, Form, Formik } from 'formik'
// import React, { useState } from 'react'
import '../globals.css'
import { account } from '@/appwrite/config'
import { ID } from 'appwrite'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { setStorage } = useLocalStorage("user");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
        const result = await account.createEmailPasswordSession(
            data?.email,
            data?.password,
        )
    } catch (error) {
        
    }
  }


  return (
    <div className="flex flex-col bg-img  justify-center items-center h-screen ">
    <div className="w-[320px] sm:w-[400px]  shadow-lg p-8 rounded-xl ">
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