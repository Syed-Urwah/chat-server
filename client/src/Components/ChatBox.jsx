import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosHeaders } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Message from "./Message";
import { UserContext } from "../Context/User/UserContext";
import io from "socket.io-client";



export default function ChatBox({ socket, arrivalMessage, setArrivalMessage }) {
  const { conversationId } = useParams();
  const { user, searchedQuery } = useContext(UserContext);
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [members, setMembers] = useState({});
  // const [arrivalMessage, setArrivalMessage] = useState(null)


  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/conversation/byConversationId/${conversationId}`
    );
    console.log(response.data);
    setMembers(response.data.members);
  };

  useEffect(() => {
    //getting message from socket
    socket.current?.on("getMessage", ({ senderId, text, conversationId }) => {
      console.log(conversationId);
      setArrivalMessage({
        sender: senderId,
        text: text,
        conversationId: conversationId,
        createdAt: Date.now(),
      });
    });

    console.log("getting");
  }, []);

  useEffect(() => {
    arrivalMessage &&
      members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log("updating");
  }, [arrivalMessage]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/message/${conversationId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.filter((msg)=>msg.text.includes('ur')));
      setMessages(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitMsg = async () => {
    if (text.length > 0) {
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:8000/message/${conversationId}`,
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            text,
          },
        });
        console.log(response.data);
        // setMessages(messages.concat(response.data));
      } catch (error) {
        console.log(error.response);
      }
      //sending message to socket
      const recieverId = await members?.find((id) => id !== user._id);
      console.log(recieverId);
      await socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: recieverId,
        text: text,
        conversationId: conversationId,
      });
      setText("");
    } else {
      alert("kindly write something");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,searchedQuery]);

  useEffect(() => {
    fetchMessages();
    fetchUser();
  }, [conversationId]);

  

  return (
    <>
    <section className="w-full xl:w-1/2 min-[870px]:w-2/3 bg-white text-black h-screen min-[870px]:block">
      <Header members={members}/>

      <div
        id="messages"
        className={`messages flex flex-col gap-4 sticky overflow-auto my-3 h-[70%]`}
      >
        {
        messages.map((e) => (
          searchedQuery === '' ?
          <div ref={scrollRef}>
            <Message key={e._id} sender={e.sender === user._id} message={e} />
          </div>
           : e.text.toLowerCase().includes(searchedQuery) && <Message key={e._id} sender={e.sender === user._id} message={e} />
           
        ))}
       
      </div>
      {/* <hr className='border-[1.5px] mt-5'/> */}
      <div
        className={`message-input fixed h-[13%] w-full xl:w-1/2 min-[870px]:w-2/3 `}
      >
        <div className="input w-11/12  mx-auto z-10">
          {/* <FontAwesomeIcon
            size="xl"
            className="text-[#a6a2a4] absolute ml-[2%] mt-[1%] hover:cursor-pointer"
            icon={faMicrophone}
          /> */}

          <textarea
            onKeyUp={(e) =>
              console.log(e.key === "Enter" && handleSubmitMsg(e))
            }
            id="story"
            name="story"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="w-full rounded-xl bg-[#f9f9f9] mx-auto pr-[6%] pl-4 text-black min:h-10"
          ></textarea>
          <label
            htmlFor="file"
            className="hover:cursor-pointer absolute right-[10%] mt-[1%] text-gray-600"
          >
            {/* <FontAwesomeIcon size="xl" icon={faImage} /> */}
          </label>
          <input type="file" name="file" id="file" className="hidden" />
          <FontAwesomeIcon
            onClick={handleSubmitMsg}
            size="xl"
            className="text-[#a6a2a4] absolute right-[6%] mt-[1%] hover:cursor-pointer"
            icon={faPaperPlane}
          />
        </div>
      </div>
    </section>
    </>
  );
}
