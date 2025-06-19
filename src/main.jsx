import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './routes/Authentication'
import Chatroom from './routes/Chatroom'
import './App.css'
import Threads from './routes/Threads'
function Root() {
  return (
    <Routes>
      <Route path="/" element={<Authentication/>}/>
      <Route path="/chatroom" element={<Chatroom/>}/>
      <Route path="/threads" element={<Threads/>}/>
    </Routes>
  )
}
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Root />
    </StrictMode>
  </BrowserRouter>,
)