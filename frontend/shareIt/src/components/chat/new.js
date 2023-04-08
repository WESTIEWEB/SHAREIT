import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'react-moment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatIcon from '@mui/icons-material/Chat';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import "./chat.css"

const socket = io();

export default function Main() {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [messages, setMessages] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messageContainerRef = useRef(null);



  useEffect(() => {
    socket.on('clients-total', (data) => {
      setClientsTotal(data);
    });

    socket.on('chat-msg', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('feedback', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('clients-total');
      socket.off('chat-msg');
      socket.off('feedback');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();

    if (messageInput === '') return;

    const data = {
      name: nameInput || 'anonymous',
      message: messageInput,
      dateTime: new Date().toISOString(),
    };

    socket.emit('message', data);

    setMessages((prevMessages) => [...prevMessages, data]);
    setMessageInput('');
  }

  function handleNameInputChange(e) {
    setNameInput(e.target.value);
  }

  function handleMessageInputChange(e) {
    setMessageInput(e.target.value);

    if (e.target.value === '') return;

    socket.emit('feedback', {
      feedback: `<DriveFileRenameOutlineOutlinedIcon/> ${nameInput || 'anonymous'} is typing`,
    });
  }

  function scrollToBottom() {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }

  function clearFeedback() {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.type !== 'feedback')
    );
  }

  return (
    <div>
      <h1 className="title">LetChat 
      <ChatIcon/>
      </h1>
      <div className="main">
        <div className="name">
          <span>
            <i className="far fa-user"></i>
          </span>
          <input
            type="text"
            id="name-input"
            className="name-input"
            value={nameInput}
            maxLength="20"
            onChange={handleNameInputChange}
          />
        </div>

        <ul className="message-container" ref={messageContainerRef}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${
                message.type === 'sent' ? 'message-right' : 'message-left'
              }`}
            >
              <p className="message">
                {message.message}
                <span>
                  {message.name} ● {moment(message.dateTime).fromNow()}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <form className="message-form" onSubmit={sendMessage}>
          <input
            type="text"
            name="message"
            id="message-input"
            className="message-input"
            value={messageInput}
            onChange={handleMessageInputChange}
          />
          <div className="v-divider"></div>
          <button type="submit" className="send-button">
            send <span><SendRoundedIcon/></span>
          </button>
        </form>
      </div>
      <h3 className="clients-total" id="client-total">
    Total clients: {clientsTotal}
  </h3>
</div>
  )
}
