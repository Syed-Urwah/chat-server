import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ChatBox from './Components/ChatBox'
import ChatBoxPlaceholder from './Components/ChatBoxPlaceholder'
import Conversations from './Components/Conversations'
import UserBox from './Components/UserBox'
import Home from './pages/Home'
import Login from './pages/Login'
import Message from './pages/Message'
import Registration from './pages/Registration'
import UserStates from './Context/User/UserStates'
import ChatGpt from './Components/ChatGpt'

function App() {

  return (
   <section className='flex w-screen'>
    <UserStates>
    <BrowserRouter>
        {/* <Conversations/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/message/:conversationId' element={<Message/>}/>
          <Route path='/chatGpt/:userId' element={<Message/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/chatGpt' element={<ChatGpt/>}/>
        </Routes>
    </BrowserRouter>
    </UserStates>
   </section>
  )
}

export default App
