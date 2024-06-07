import React from 'react'
import { Button } from './ui/button'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom';
import { account } from '@/appwrite/config';

const Home = () => {
    const navigate = useNavigate();

    const { removeItem , getItem } = useLocalStorage();
    const user = getItem("cookieFallback");
  
    const onLogout = async () => {
      await account.deleteSession("current");
      removeItem("user");
      navigate("/login");
    };
  return (
    <div>
        <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Home