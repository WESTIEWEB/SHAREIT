import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthForm from './components/authForm'
import ChatModal from './pages/chatModal'
import LoginPage from '@/pages/login'
import Home from '@/components/home'
import { ToastContainer } from 'react-toastify';
import Register from './pages/register'
import Chat from '@/components/chat/chat.socket.io'
import path from 'path';
import AdminChat from '@/components/chat/adminSupport'

function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/auth-page' element={<AuthForm />} />
          <Route path='/chat-apk' element={<ChatModal />} />
          <Route path='/' element={<Home />} />
          <Route path='chat' element={<Chat />} />
          <Route path='/admin-chat' element={<AdminChat />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
