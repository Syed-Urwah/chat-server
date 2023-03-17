import React from 'react'
import ChatBox from '../Components/ChatBox'
import Conversations from '../Components/Conversations'
import UserBox from '../Components/UserBox'

export default function Message() {
    return (
        <>
            <Conversations />
            <ChatBox />
            <UserBox />
        </>
    )
}
