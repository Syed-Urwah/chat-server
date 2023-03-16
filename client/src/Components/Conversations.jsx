import React from 'react'
import profilePic from '../assets/images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons'
import UserConversation from './UserConversation'
import { useLocation } from 'react-router-dom'
export default function Conversations() {

  const location = useLocation();

  return (
    <section id='conversations' className={`${location.pathname === '/message' && 'hidden'} min-[870px]:flex text-white flex-col gap-8 bg-[#f9f9f9] w-full xl:w-3/12 min-[870px]:w-1/3 h-screen sticky overflow-auto pt-7`}>
        <div className="current-user flex justify-between items-center mx-5">
            <div className="left flex items-center gap-2">
                <img className='w-16 h-16 rounded-full' src={profilePic} alt="" />
                <div className="user-details my-auto">
                    <h2 className='text-[#0191fc] text-2xl'>Syed Urwah</h2>
                    <p className='text-gray-700'>web developer</p>
                </div>
            </div>
            <FontAwesomeIcon icon={faPencil} size='lg' className="text-[#b9b0b0]" />
        </div>

        <div className="search w-full flex justify-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className='text-[#b9b0b0] absolute left-[12%] min-[870px]:left-[13%] mt-[10px]'/>
          <input type="text" placeholder='Search Friends' className='w-4/5 h-10 mx-auto rounded-2xl text-[#b9b0b0] pl-10' />
        </div>

        <div className="users mx-5 flex flex-col gap-4">
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>
          <UserConversation/>

        </div>
    </section>
  )
}
