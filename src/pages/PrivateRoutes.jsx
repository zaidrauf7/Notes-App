import React from 'react'
import Layout from './Layout'
import { Navigate, Outlet } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage';

const PrivateRoutes = () => {
  const { getItem } = useLocalStorage();

 const user = getItem("user")
 return user ? (
    <Layout >
        <Outlet/>
    </Layout>
 ):
 (<Navigate to={"/signup"}/>)
}

export default PrivateRoutes