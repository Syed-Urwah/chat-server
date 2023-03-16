import React from 'react'
import profilePic from '../assets/images/profile.jpg'

export default function Message({sender}) {
  return (
    <div className={`flex items-end ${sender && 'justify-end'}`}>
        <img className='w-6 h-6' src={profilePic} alt="" />
        <p className='text-xl font-light bg-[#f9f9f9] rounded-md px-4 py-2'>Wow Great</p>
    </div>
  )
}
