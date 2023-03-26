import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profilePic from '../assets/images/profile.jpg'
import { UserContext } from '../Context/User/UserContext'
import axios from 'axios'
import { format } from 'timeago.js'

export default function UserConversation({ conversation, searchedUser, arrivalMessage, newMessage }) {

    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    const [users, setUsers] = useState({});
    const [lastMessage, setLastMessage] = useState({})
    const [singleConversation, setSingleConversation] = useState({});

    const fetchConversation = async () =>{
        try {
            const response = await axios.get(`http://localhost:8000/conversation/getByReciver?reciever=${searchedUser._id}`,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            console.log(response.data);
            setSingleConversation(response.data);
        } catch (error) {
            console.log(error)
        }
        
    }

    const fetchUser = async () => {
        try {
            const friendId = conversation.members.find((e) => e !== user._id)
            const response = await axios.get(`http://localhost:8000/user/fetchUser/${friendId}`);
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.log(error)
        }

    }

    const fetchLastMessage = async () => {
        const response = await axios.get(`http://localhost:8000/message/latestMessage/${conversation._id}`)
        console.log(response.data);
        setLastMessage(response.data);
    }

    const handleConversation = async () => {
        if (conversation) {
             navigate(`/message/${conversation._id}`)
        } else {
            try {
                console.log('user')
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:8000/conversation/',
                    data: {
                        senderId: user._id,
                        recieverId: searchedUser._id
                    }
                })
                console.log(response.data)
                navigate(`/message/${response.data._id}`)
            } catch (error) {
                console.log(error)
            }


        }
    }

    
    function formatTime(time) {
        const date = new Date(time);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    useEffect(() => {
        newMessage && console.log(newMessage)
        newMessage && lastMessage[
            { text: newMessage }
        ]
    }, [newMessage])

    useEffect(() => {
        conversation && fetchUser();
        conversation && fetchLastMessage();
        // searchedUser && fetchConversation();
        searchedUser && console.log(searchedUser._id);
        // console.log(conversation._id)
    }, [newMessage, searchedUser])

    return (
        <div onClick={handleConversation} className='flex gap-2 hover:cursor-pointer'>
            <img src={conversation ? users.imgUrl : searchedUser.imgUrl} className='w-14 h-14 rounded-full' alt="" />
            <div className="user-details my-auto w-full">
                <div className='flex justify-between items-center'>
                    <h2 className='text-[#0191fc] text-xl'>{conversation ? users.name : searchedUser.name}</h2>
                    <p className='text-[#b9b0b0]'>{conversation && formatTime(lastMessage[0]?.createdAt)}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-700 text-sm'>{lastMessage[0]?.text.slice(0, 10)}</p>
                    <FontAwesomeIcon icon={faCheck} size='xs' className='text-[#0191fc]' />
                </div>
            </div>
        </div>
    )
}
