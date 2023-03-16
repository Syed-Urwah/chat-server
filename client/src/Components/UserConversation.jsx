import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../assets/images/profile.jpg'

export default function UserConversation() {
    return (
        <Link to='/message' className='flex gap-2'>
            <img src={profilePic} className='w-14 h-14 rounded-full' alt="" />
            <div className="user-details my-auto w-full">
                <div className='flex justify-between items-center'>
                    <h2 className='text-[#0191fc] text-xl'>Syed Urwah</h2>
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
