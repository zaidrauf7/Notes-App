import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col bg-img  justify-center items-center h-screen ">
    <div className="w-[320px] sm:w-[400px]  shadow-lg p-8 rounded-xl ">
     <h1 className="text-center mb-4 text-xl font-bold text-white">Sign Up</h1>
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
</div>
  )
}

export default Login