import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthForm from './components/authForm'
import ChatModal from './pages/chatModal'
import LoginPage from './pages/login'
import Home from './components/home'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/auth-page' element={<AuthForm />} />
          <Route path='/chat-apk' element={<ChatModal />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
