import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/images/profile.jpg'
import { UserContext } from '../Context/User/UserContext';

export default function Message({sender, message}) {

  const [user, setUser] = useState({});

  const fetchUser = async () =>{
    const response = await axios.get(`http://localhost:8000/user/fetchUser/${message.sender}`);
    setUser(response.data);
  }


  useEffect(()=>{
    fetchUser()
  },[])
  

  return (
    <div className={`flex items-end ${sender && 'justify-end mr-3'}`}>
        <img className='w-6 h-6' src={user.imgUrl} alt="" />
        <p className={`text-xl font-light  ${sender ? 'bg-blue-500 text-white' : 'bg-[#f9f9f9]'} rounded-md px-4 py-2 max-w-[50%] break-all`}>{message.text}
        </p>
    </div>
  )
}
