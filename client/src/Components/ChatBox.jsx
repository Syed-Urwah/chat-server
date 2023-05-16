import { faCircleNotch, faImage, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosHeaders } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import Message from "./Message";
import { UserContext } from "../Context/User/UserContext";
import io from "socket.io-client";
import { Configuration, OpenAIApi } from 'openai'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { app, storage } from '../firebase.js'




export default function ChatBox({ socket, arrivalMessage, setArrivalMessage }) {
  const { conversationId } = useParams();
  const { user, searchedQuery } = useContext(UserContext);
  const scrollRef = useRef();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('')
  const [members, setMembers] = useState({});
  const [chatGpt, setChatGpt] = useState(false)
  const [image, setImage] = useState("");
  const [video, setVideo] = useState('');
  const [fileLoading , setFileLoading] = useState(false);
  // const [arrivalMessage, setArrivalMessage] = useState(null)

  //openai
  const openai = new OpenAIApi(new Configuration({
    apiKey: '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'
  }))


  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/conversation/byConversationId/${conversationId}`
    );
    console.log(response.data);
    setMembers(response.data.members);
  };

  useEffect(() => {
    //getting message from socket
    socket.current?.on("getMessage", ({ senderId, text, imgUrl , videoUrl ,conversationId }) => {
      console.log(conversationId);
      setArrivalMessage({
        sender: senderId,
        text: text,
        imgUrl: imgUrl,
        videoUrl: videoUrl,
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
      setMessages(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const sendMessageToChatGpt = async () => {
    try {
      const response = await openai.createChatCompletion({
        model: 'text-davinci-003',
        messages: [{
          role: 'user',
          content: text
        }]
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitMsg = async () => {
    if (chatGpt) {
      //chatgpt chatCompletion
      sendMessageToChatGpt()

    } else {
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
              imgUrl,
              videoUrl
            },
          });
          console.log(response.data);
          setImgUrl('')
          setVideoUrl('')
          setImage('');
          setVideo('')
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
          imgUrl: imgUrl,
          videoUrl: videoUrl,
          conversationId: conversationId,
        });
        setText("");
      } else {
        alert("kindly write something");
      }
    }

  }

  const handleFile = (e) => {
    console.log(e.target.files[0].type.split('/')[0])
    if (e.target.files[0].type.split('/')[0] === 'image') {
      setVideo('')
      setImage(e.target.files[0])
      fileUpload(e.target.files[0], 'image')
    } else {
      console.log('video')
      setImage('')
      setVideo(e.target.files[0]);
      fileUpload(e.target.files[0], 'video')
    }
  }

  const fileUpload = (file, type) => {
    setFileLoading(true);
    // const storage = getStorage();
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage);
    const imageRef = ref(storage, 'images/' + fileName);
    const videoRef = ref(storage, 'videos/' + fileName);

    console.log(file)

    // 'file' comes from the Blob or File API
    if (type === 'image') {
      uploadBytes(imageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(imageRef)
          .then((url) => {
            console.log(url)
            setImgUrl(url);
            setFileLoading(false);
          })
      });
    } else {
      uploadBytes(videoRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(videoRef)
          .then((url) => {
            console.log(url);
            setVideoUrl(url);
            setFileLoading(false)
          });
      });
    }



  }

  const sendImage = async (url) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8000/message/${conversationId}`,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          imgUrl: url,
        },
      });
      console.log(response.data);
      // setMessages(messages.concat(response.data));
    } catch (error) {
      console.log(error.response);
    }
    //sending message to socket
    // const recieverId = await members?.find((id) => id !== user._id);
    // console.log(recieverId);
    // await socket.current.emit("sendImage", {
    //   senderId: user._id,
    //   receiverId: recieverId,
    //   imgUrl: imgUrl,
    //   conversationId: conversationId,
    // });
  }

  function handleFileCancel(){
    setImage('');
    setVideo('');
    setImgUrl('');
    setVideoUrl('');
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, searchedQuery]);

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'chatGpt') {
      setChatGpt(true)
      setMessages([])
    } else {
      setChatGpt(false)
      fetchMessages();
      fetchUser();
    }

  }, [conversationId, location]);



  return (
    <>
      <section id="chat-box" className="w-full xl:w-1/2 min-[870px]:w-2/3 bg-white text-black h-screen min-[870px]:block">
        <Header members={members} />

        {
          image || video ? <div className="image-viewer w-full h-[70%] bg-transparent flex justify-center items-center">
                    <FontAwesomeIcon onClick={handleFileCancel} className="absolute top-[17%] xl:left-[27%] min-[870px]:left-[36%] left-[6%] hover:cursor-pointer fa-beat" icon={faXmark} size="2x" />
                    {fileLoading ? <FontAwesomeIcon size="2x" className="fa-spin" icon={faCircleNotch} /> :
                    imgUrl ? <img src={imgUrl} className="w-1/2 h-3/4" alt="" /> : 
                    <video className="w-1/2 h-3/4" controls src={videoUrl}></video>}
                  </div> :

            <div
              id="messages"
              className={`messages flex flex-col gap-4 sticky overflow-auto my-3 h-[70%]`}
            >
              {
                messages.map((e) => (
                  searchedQuery === '' ?
                    <div ref={scrollRef}>
                      <Message key={e._id} sender={e.sender === user._id} message={e} image={true} />
                    </div>
                    : e.text.toLowerCase().includes(searchedQuery) && <Message key={e._id} sender={e.sender === user._id} message={e} />

                ))}

            </div>
        }





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
              className="hover:cursor-pointer absolute right-[14%] sm:right-[10%] mt-[1%] text-gray-600"
            >
              <FontAwesomeIcon size="xl" icon={faImage} />
            </label>
            <input accept="image/*,video/*" type="file" name="file" id="file" className="hidden" onChange={handleFile} />
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
