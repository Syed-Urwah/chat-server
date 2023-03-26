import React, { useContext, useEffect, useState } from 'react'
import profilePic from '../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons'
import UserConversation from './UserConversation'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../Context/User/UserContext'
import axios from 'axios'

export default function Conversations({arrivalMessage}) {

  const location = useLocation();
  const { user } = useContext(UserContext);

  //useStates
  const [conversations, setConversations] = useState([]);
  const [messageLocation, setMessageLocation] = useState([])
  const [searchUsers, setSearchUsers] = useState([]);
  const [query, setQuery] = useState('')

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/conversation/byUserId/${user._id}`)
      console.log(response.data);
      setConversations(response.data);
    } catch (error) {
      console.log(error.response)
    }

  }

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    try {
      const response = await axios.get(`http://localhost:8000/user/fetchByName?search=${e.target.value}`);
      console.log(response.data);
      console.log(Object.keys(response.data).length)
      setSearchUsers(response.data);
    } catch (error) {
      console.log(error)
    }

  }

  

  useEffect(()=>{
    console.log(arrivalMessage);
  },[arrivalMessage])


  useEffect(() => {
    fetchConversations()
    setMessageLocation(location.pathname.split('/'))
    console.log(messageLocation[1])
  }, [])


  return (
    <section id='conversations' className={`${messageLocation[1] === 'message' && 'hidden'} min-[870px]:flex text-white flex-col gap-8 bg-[#f9f9f9] w-full xl:w-3/12 min-[870px]:w-1/3 h-screen sticky overflow-auto pt-7`}>
      <div className="current-user flex justify-between items-center mx-5">
        <div className="left flex items-center gap-2">
          <img className='w-16 h-16 rounded-full' src={user.imgUrl} alt="" />
          <div className="user-details my-auto">
            <h2 className='text-[#0191fc] text-2xl'>{user.name}</h2>
            <p className='text-gray-700'>{user.shortDescription}</p>
          </div>
        </div>
        <FontAwesomeIcon icon={faPencil} size='lg' className="text-[#b9b0b0]" />
      </div>

      <div className="search w-full flex justify-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className='text-[#b9b0b0] absolute left-[12%] min-[870px]:left-[13%] mt-[10px]' />
        <input onChange={handleSearch} value={query} type="text" placeholder='Search Friends' className='w-4/5 h-10 mx-auto rounded-2xl text-[#b9b0b0] pl-10' />
      </div>

      <div className="users mx-5 flex flex-col gap-4">
        {
          query === '' ?
            conversations.map((e) => {
              return <UserConversation key={e._id} conversation={e} newMessage={arrivalMessage?.conversationId === e._id && arrivalMessage.text}/>
            }) : Object.keys(searchUsers).length === 0 ? <p className='text-black'>Search by name</p> :
             searchUsers.map((e)=>{

              

                if(e._id !== user._id){
                  return <UserConversation key={e._id} searchedUser={e} arrivalMessage = {arrivalMessage}/>
                }
             })
        }
      </div>
    </section>
  )
}
