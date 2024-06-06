import { Input } from '@/components/ui/input'
import { Field, Form, Formik } from 'formik'
import React from 'react'

const SignUp = () => {
    const onSubmit = async (data) => {
        
    }
  return (
        <div>
             <h1 className="text-center mb-4 text-xl font-bold">Sign Up</h1>
             <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-8">
            <Field as={Input} name="name" type="text" placeholder={"Name"} />
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
  )
}

export default SignUp