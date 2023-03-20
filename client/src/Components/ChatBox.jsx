import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { AxiosHeaders } from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header'
import Message from './Message'
import { UserContext } from '../Context/User/UserContext';

export default function ChatBox() {

  const { conversationId } = useParams();
  const {user} = useContext(UserContext);
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);
  const [text , setText] = useState('')



  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/message/${conversationId}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.log(error.response)
    }

  }

  const handleSubmitMsg = async () =>{
    if(text.length > 0){
      try {
        const response = await axios({
          method: 'post',
          url: `http://localhost:8000/message/${conversationId}`,
          headers:{
            'token': localStorage.getItem('token')
          },
          data:{
            text
          }
        });
        console.log(response.data)
        setMessages(messages.concat(response.data));
      } catch (error) {
        console.log(error.response)
      }
    }else{
      alert('kindly write something')
    }
   
    
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  },[messages])


  useEffect(() => {

    fetchMessages();

    // const recentMessages = document.getElementById('messages');
    // recentMessages.scrollTo(0, recentMessages.scrollHeight);

  }, [conversationId])

  return (
    <section className='w-full xl:w-1/2 min-[870px]:w-2/3 bg-white text-black h-screen min-[870px]:block'>
      <Header />

      <div id='messages' className={`messages flex flex-col gap-4 sticky overflow-auto my-3 h-[70%]`}>
        {messages.map((e)=>(
          <div ref={scrollRef}>
            <Message key={e._id} sender={e.sender === user._id} message={e}/>
          </div>
        ))}
      </div>
      {/* <hr className='border-[1.5px] mt-5'/> */}
      <div className={`message-input fixed h-[13%] w-full xl:w-1/2 min-[870px]:w-2/3 `}>


        <div className="input w-11/12  mx-auto z-10">

          <FontAwesomeIcon size='xl' className='text-[#a6a2a4] absolute ml-[2%] mt-[1%]' icon={faMicrophone} />

          {/* <textarea type="text" className='w-full rounded-xl bg-[#f9f9f9] mx-auto pl-[6%] text-black min:h-10' /> */}
          <textarea id="story" name="story" onChange={(e)=>setText(e.target.value)} value={text}
             className='w-full rounded-xl bg-[#f9f9f9] mx-auto px-[6%] text-black min:h-10'>
          </textarea>
          <FontAwesomeIcon onClick={handleSubmitMsg} size='xl' className='text-[#a6a2a4] absolute right-[6%] mt-[1%] hover:cursor-pointer' icon={faPaperPlane} />

        </div>
      </div>



    </section>
  )
}
