import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Context/User/UserContext'
import profilePic from '../assets/images/profile.jpg'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Header({members}) {

    const [search, setSearch] = useState(false);
    const [users, setUsers] = useState({});
    const {user, setSearchedQuery, searchedQuery} = useContext(UserContext)

    

    const fetchUser = async () =>{
        const friendId = await members.find((id)=>id !== user._id)
        const response = await axios.get(`http://localhost:8000/user/fetchUser/${friendId}`);
        console.log(response.data);
        setUsers(response.data);
      }

    useEffect(()=>{
        members && fetchUser()
    },[members])

    

    return (
        <header className='h-[12%] mx-5 mt-7 sticky'>
            
            {
                !search ?
                    <div className='flex justify-between mx-3'>
                        <div className="left flex items-center">
                            <img src={users.imgUrl} className='w-14 h-14 rounded-full mr-4' alt="" />
                            <h2 className='text-2xl'>{users.name}</h2>
                        </div>

                        <div className="right flex items-center">
                            <FontAwesomeIcon onClick={() => setSearch(true)} icon={faMagnifyingGlass} size="2x" className='text-[#b9b0b0] hover:cursor-pointer' />
                            <FontAwesomeIcon size='2x' className='text-[#b9b0b0]' icon={faHeart} />

                        </div>
                    </div> :
                    <div className="search">
                        <FontAwesomeIcon className='absolute mt-[1%] ml-[2%] hover:cursor-pointer' onClick={() => {setSearch(false)
                            setSearchedQuery('')}} size='lg' icon={faArrowLeft} />
                        <input onChange={(e)=>setSearchedQuery(e.target.value)} value={searchedQuery} type="text" className='bg-[#f9f9f9] w-11/12 rounded-lg h-10 pl-[6%]' />
                    </div>

            }



            <hr className='border-[1.5px] mt-5' />
        </header>
    )
}
