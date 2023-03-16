import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Message from './Message'

export default function ChatBox() {

  const [textareaRows, setTextareaRows] = useState(0)
  const [inputHeight , setInputHeight] = useState(13)
  const [messageHeight, setMessageHeight] = useState(70);


  useEffect(() => {
    const recentMessages = document.getElementById('messages');
    recentMessages.scrollTo(0, recentMessages.scrollHeight);

  }, [])

  function handelInput(e){
    console.log(e.target.scrollHeight);
    setTextareaRows(e.target.scrollHeight/24)
    setInputHeight(e.target.scrollHeight)
    setMessageHeight(70 - e.target.scrollHeight )
  }

  return (
    <section className='w-full xl:w-1/2 min-[870px]:w-2/3 bg-white text-black h-screen min-[870px]:block'>
      <Header />

      <div id='messages' className={`messages flex flex-col gap-4 sticky overflow-auto my-3 h-[70%]`}>
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
        <Message sender={true} />
        <Message sender={false} />
        <Message sender={true} />
      </div>
      {/* <hr className='border-[1.5px] mt-5'/> */}
      <div className={`message-input fixed h-[13%] w-full xl:w-1/2 min-[870px]:w-2/3 `}>


        <div className="input w-11/12  mx-auto z-10">

          <FontAwesomeIcon size='xl' className='text-[#a6a2a4] absolute ml-[2%] mt-[1%]' icon={faMicrophone} />

          {/* <textarea type="text" className='w-full rounded-xl bg-[#f9f9f9] mx-auto pl-[6%] text-black min:h-10' /> */}
          <textarea id="story" name="story" onChange={handelInput}
             cols="33" className='w-full rounded-xl bg-[#f9f9f9] mx-auto px-[6%] text-black min:h-10'>
          </textarea>
          <FontAwesomeIcon size='xl' className='text-[#a6a2a4] absolute right-[6%] mt-[1%]' icon={faPaperPlane} />

        </div>
      </div>



    </section>
  )
}
