import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profilePic from '../assets/images/profile.webp'
import axios from 'axios'


export default function Registration() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('')
  const [error, setError] = useState('');

  

  const handleRegistration = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios({
      method: 'post',
      url: 'http://localhost:8000/auth/registration',
      data:{
        name: name,
        email: email,
        password: password
      }
    })
    console.log(response.data);
    navigate('/login');
    } catch (error) {
      setError(error.response.data);
      setTimeout(()=>{
          setError('')
      },1000)
    }
    
  }

  return (
    <section className=" my-auto w-screen h-screen flex items-center justify-center">
      <div className="bg-img h-full w-full bg-cover blur-md absolute bg-[url('./assets/images/bg-login.jpg')]"></div>
      <form onSubmit={handleRegistration} className='h-[550px] bg-[#ffffff80] z-10 w-[484px] rounded-lg flex flex-col items-center justify-center gap-4'>
        {error && <p>{error}</p>}
        <img className='rounded-full w-28' src={profilePic} alt="" />

        <div className="inputs sm:w-3/4 w-full flex flex-col items-center gap-6">
          <div className="email flex flex-col w-full gap-2">
            <label className='text-[#8b8b8d] font-light' htmlFor="name">Name</label>
            <input onChange={(e)=>setname(e.target.value)} value={name} name='name' type="text" className='w-full text-black rounded-md h-10 border-[#f1f2f6] border' />
          </div>

          <div className="email flex flex-col w-full gap-2">
            <label className='text-[#8b8b8d] font-light' htmlFor="email">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} name='email' type="email" className='w-full rounded-md h-10 border-[#f1f2f6] border' />
          </div>

          <div className="password flex flex-col w-full gap-4">
            <label  className='text-[#8b8b8d] font-light' htmlFor="password">password</label>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} name='password' type="password" className='w-full rounded-md h-10 border-[#f1f2f6] border' />
          </div>

        </div>

        <button type='submit' className='bg-transparent w-3/4 border border-blue-600 py-2 rounded-md text-blue-600 hover:text-white hover:bg-blue-600'>Create an account</button>
        <hr className='border-[1.5px] border-[#f1f2f6] w-3/4' />
        <Link to='/login' className='text-blue-700'>Already have an account</Link>
      </form>
    </section>
  )
}
