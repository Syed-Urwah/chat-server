import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../assets/images/profile.jpg'
import { UserContext } from '../Context/User/UserContext'
import axios from 'axios'

export default function UserConversation({conversation}) {

    const {user} = useContext(UserContext)

    const [users, setUsers] = useState({});

    const fetchUser = async () =>{
        try {
            const friendId = conversation.members.find((e)=> e !== user._id )
            const response = await axios.get(`http://localhost:8000/user/fetchUser/${friendId}`);
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.log(error)
        }
       
    }

    useEffect(()=>{
        console.log(conversation)
        fetchUser()
    },[])

    return (
        <Link to={`/message/${conversation._id}`} className='flex gap-2'>
            <img src={users.imgUrl} className='w-14 h-14 rounded-full' alt="" />
            <div className="user-details my-auto w-full">
                <div className='flex justify-between items-center'>
                    <h2 className='text-[#0191fc] text-xl'>{users.name}</h2>
                    <p className='text-[#b9b0b0]'>11:45AM</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-700 text-sm'>web developer</p>
                    <FontAwesomeIcon icon={faCheck} size='xs' className='text-[#0191fc]'/>
                </div>
            </div>
        </Link>
    )
}
