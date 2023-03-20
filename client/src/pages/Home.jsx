import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatBoxPlaceholder from '../Components/ChatBoxPlaceholder'
import Conversations from '../Components/Conversations'
import { UserContext } from '../Context/User/UserContext';

export default function Home() {

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
    !Object.keys(user).length > 0 && navigate('/login')
  },[])
  

  return (
    <>
    <Conversations/>
    <ChatBoxPlaceholder/>
    </>
  )
}
