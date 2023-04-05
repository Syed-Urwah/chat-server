import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import profilePic from '../assets/images/profile.jpg'
import { UserContext } from '../Context/User/UserContext';
import RobotPic from '../assets/images/robot.png'

export default function UserBox() {
  const { conversationId } = useParams();
  const location = useLocation();

  const {user} = useContext(UserContext)

  const [users, setUsers] = useState({})
  const [chatGpt, setChatGpt] = useState(false)

  const fetchUser = async () =>{
    const conversation = await axios.get(`http://localhost:8000/conversation/byConversationId/${conversationId}`);
    console.log(conversation.data);
    const friendId = await conversation.data.members.find((id)=>id !== user._id)
    const response = await axios.get(`http://localhost:8000/user/fetchUser/${friendId}`);
    console.log(response.data);
    setUsers(response.data);
  }

  useEffect(()=>{
    if(location.pathname.split('/')[1] === 'chatGpt'){
      setChatGpt(true)
    }else{
      setChatGpt(false)
      fetchUser()
    }
    
  },[conversationId])

  

  return (
    <section className='w-3/12 bg-[#f9f9f9] text-white hidden h-screen sticky xl:block'>
        <div className="user flex flex-col items-center h-full justify-center">
          <img className='w-28 h-28 rounded-full' src={chatGpt ? RobotPic : users.imgUrl} alt="" />
          <h2 className='text-gray-700 text-4xl font-normal'>{chatGpt ? 'AI' :users.name}</h2>
          <p className='text-gray-700 font-thin text-xl'>{chatGpt ? 'Chat with me' : users.shortDescription}</p>
        </div>
    </section>
  )
}
