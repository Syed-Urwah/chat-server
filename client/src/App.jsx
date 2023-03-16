import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ChatBox from './Components/ChatBox'
import ChatBoxPlaceholder from './Components/ChatBoxPlaceholder'
import Conversations from './Components/Conversations'
import UserBox from './Components/UserBox'

function App() {

  return (
   <section className='flex w-screen'>
    <BrowserRouter>
        <Conversations/>
        <Routes>
          <Route path='/' element={<ChatBoxPlaceholder/>}/>
          <Route path='/message' element={<><ChatBox/> <UserBox/></>}/>
        </Routes>
    </BrowserRouter>
   </section>
  )
}

export default App
