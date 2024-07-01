import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import "../globals.css";
import { account, db } from "@/appwrite/config";
import { ID } from "appwrite";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setLoading(true);
    <Navigate to={"/login"}/>

    try {
      const result = await account.create(
        ID.unique(),
        data?.email,
        data?.password,
        data?.name
      );
      if (result) {
        const userData = await db.createDocument(
          "666305ca001c5404a618",
          "667eb0750038b3a5a934",
          ID.unique(),
          {
            email: data?.email,
            name: data?.name,
            userId: result?.$id,
          }
        );
      }
      setLoading(false);
      toast({
        variant: "success",
        description: "Account created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
      setLoading(false);

      console.log(error);
    }
  };
  return (
    <div className="flex flex-col bg-img  justify-center items-center h-screen ">
      <div className="w-[320px] sm:w-[400px]  shadow-lg p-8 bg-[#00000068]  rounded-xl ">
        <h1 className="text-center mb-4 text-xl font-bold text-white">
          Sign Up
        </h1>
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
  );
};

export default SignUp;
