import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './routes/Authentication'
import Chatroom from './routes/Chatroom'
import Threads from './routes/Threads'
import './App.css'
import About from './routes/About'
function Root() {
  return (
    <Routes>
      <Route path="/" element={<Authentication/>}/>
      <Route path="/chatroom" element={<Chatroom/>}/>
      <Route path="/threads" element={<Threads/>}/>
      <Route path="/about" element={<About/>}/>
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