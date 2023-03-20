import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatBox from '../Components/ChatBox'
import Conversations from '../Components/Conversations'
import UserBox from '../Components/UserBox'
import { UserContext } from '../Context/User/UserContext';
import io from 'socket.io-client'

export default function Message() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //socket
  const socket = useRef()

  useEffect(()=>{
    socket.current = io('ws://localhost:8900');
  },[])

  useEffect(()=>{
    Object.keys(user).length > 0 && socket.current.emit('addUsers', user._id)
    socket.current.on('users', (users)=>{
      console.log(users)
    })
  },[user])

  
 

  useEffect(() => {
    !Object.keys(user).length > 0 && navigate('/login')
    console.log(user._id)
  }, [])

  return (
    <>
      <Conversations />
      <ChatBox />
      <UserBox />
    </>
  )
}
