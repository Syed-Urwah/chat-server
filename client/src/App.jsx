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

function App() {

  return (
   <section className='flex w-screen'>
    <BrowserRouter>
        {/* <Conversations/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/message' element={<Message/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
    </BrowserRouter>
   </section>
  )
}

export default App
