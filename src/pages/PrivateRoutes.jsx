import React from "react";
import Layout from "./Layout";
import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";

const PrivateRoutes = () => {
  const { getItem } = useLocalStorage();

  const user = getItem("cookieFallback");
  return user.a_session_666191a00026fbe3a2bc ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
