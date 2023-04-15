import AdminChat from '@/components/chat/adminSupport';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
  const [role, setRole] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<string>('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData') as string);
    setRole(user?.role)
    setCurrentUser(user?._id);
  }, [])

  const RenderChat = () => {
    if(role === 'admin') {
      return <AdminChat currentUser={currentUser}/>
    }
    else {
      return <div>Chat</div>
    }
  }
  return (
    <React.Fragment>
        <RenderChat />
    </React.Fragment>
  )
}

export default ChatPage
