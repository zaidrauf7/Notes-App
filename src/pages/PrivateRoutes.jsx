import React from 'react'
import Layout from './Layout'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
 const user = false
 return user ? (
    <Layout >
        <Outlet/>
    </Layout>
 ):
 (<Navigate to={"/"}/>)
}

export default PrivateRoutes