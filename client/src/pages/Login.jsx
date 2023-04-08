import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profilePic from '../assets/images/profile.webp'
import axios from 'axios'
import { UserContext } from '../Context/User/UserContext'
import { auth, GoogleProvider, FacebookProvider } from '../firebase.js'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import googleLogo from '../assets/images/google.png'
import googleLogo2 from '../assets/images/google(2).png'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')


    const { setUser } = useContext(UserContext)
    const navigate = useNavigate();

   

    const handleEmail = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/auth/login',
                data: {
                    email: email,
                    password: password
                }
            })
            localStorage.setItem('token', response.data.token)
            console.log(response.data);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            setError(error.response.data);
            setTimeout(() => {
                setError('')
            }, 1000)
        }

    }

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const googleResponse = await signInWithPopup(auth, GoogleProvider);
        console.log(googleResponse.user);
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/auth/google',
            data:{
                name: googleResponse.user.displayName,
                email: googleResponse.user.email,
                imgUrl: googleResponse.user.photoURL
            }
        })
        console.log(response.data);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/')
        } catch (error) {
            console.error(error);
        }
        
    }

    const handleFacebookLogin = async (e) =>{
        e.preventDefault();
        const FacebookResponse = await signInWithRedirect(auth, FacebookProvider);
        console.log(FacebookResponse);
    }


    return (
        <section className=" my-auto w-screen h-screen flex items-center justify-center">
            <div className="bg-img h-full w-full bg-cover blur-md absolute bg-[url('./assets/images/bg-login.jpg')]"></div>
            <form onSubmit={handleLogin} className='h-[550px] bg-[#ffffff80] z-10 w-[484px] rounded-lg flex flex-col items-center justify-center gap-4'>
                {error && <p>{error}</p>}
                <img className='rounded-full w-28' src={profilePic} alt="" />

                <div className="inputs sm:w-3/4 w-full flex flex-col items-center gap-6">
                    <div className="email flex flex-col w-full gap-2">
                        <label className='text-[#8b8b8d] font-light' htmlFor="email">Email</label>
                        <input onChange={handleEmail} value={email} name='email' type="email" className='w-full rounded-md h-10 border-[#f1f2f6] border' />
                    </div>

                    <div className="password flex flex-col w-full gap-4">
                        <label className='text-[#8b8b8d] font-light' htmlFor="password">password</label>
                        <input onChange={handlePassword} value={password} name='password' type="password" className='w-full rounded-md h-10 border-[#f1f2f6] border' />
                    </div>

                </div>

                <div className="third-row flex justify-between items-center w-full sm:w-3/4">
                    <Link className='text-blue-700'>Forgot Password?</Link>
                    <button type='submit' className='bg-blue-700 py-4 px-16 rounded-md text-white'>Login</button>
                </div>

                <hr className='border-[1.5px] border-[#f1f2f6] w-3/4' />

                <button onClick={handleGoogleLogin} className='flex items-center border-2 border-solid border-[#30303d] rounded-xl py-2 gap-4 w-80 justify-center hover:bg-white hover:text-black'>
                    <img id='hover-google' className='w-4 h-4' src={googleLogo2} alt="" /><p>Continue with Google</p>
                </button>

               

                <Link to='/registration' className='text-blue-700'>Did'nt have account</Link>
            </form>
        </section>
    )
}
