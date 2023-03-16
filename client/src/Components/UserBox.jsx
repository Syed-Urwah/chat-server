import React from 'react'
import profilePic from '../assets/images/profile.jpg'

export default function UserBox() {
  return (
    <section className='w-3/12 bg-[#f9f9f9] text-white hidden h-screen sticky xl:block'>
        <div className="user flex flex-col items-center h-full justify-center">
          <img className='w-28 h-28 rounded-full' src={profilePic} alt="" />
          <h2 className='text-gray-700 text-4xl font-normal'>Syed Urwah</h2>
          <p className='text-gray-700 font-thin text-xl'>Web developer</p>
        </div>
    </section>
  )
}
