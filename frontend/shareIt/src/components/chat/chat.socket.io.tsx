import React, { useState, useEffect } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

const socket = io();

function Chat() {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [messages, setMessages] = useState<Array<Record<string,any>>>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('clients-total', (data) => {
      setClientsTotal(data);
    });

    socket.on('chat-message', (data) => {
      setMessages((prevMessages: any) => [...prevMessages, { ...data, isOwnMessage: false }]);
      const messageTone = new Audio('@/assets/mp3/message-tone.mp3');
      messageTone.play();
    });

    socket.on('feedback', (data) => {
      setMessages((prevMessages: any) => [...prevMessages, { feedback: data.feedback }]);
    });

    return () => {
      socket.off('clients-total');
      socket.off('chat-message');
      socket.off('feedback');
    };
  }, []);

  function handleSubmit(e:any) {
    e.preventDefault();
    if (message === '') return;
    const data = {
      name,
      message,
      dateTime: new Date(),
    };
    socket.emit('message', data);
    setMessages((prevMessages: any) => [...prevMessages, { ...data, isOwnMessage: true }]);
    setMessage('');
  }

  function handleNameChange(e:any) {
    setName(e.target.value);
  }

  function handleMessageChange(e:any) {
    setMessage(e.target.value);
    socket.emit('feedback', { feedback: `✍️ ${name} is typing a message` });
  }

  function clearFeedback() {
    setMessages((prevMessages: any) => prevMessages.filter((msg:any) => !msg.feedback));
  }

  function scrollToBottom() {
    const messageContainer = document.getElementById('message-container');
    if(messageContainer) messageContainer.scrollTo(0, messageContainer.scrollHeight);
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <>
        <h1 className="title">iChat 💬</h1>
        <div className="main">
          <div className="name">
            <span><i className="far fa-user"></i></span>
            <input
              type="text"
              id="name-input"
              className="name-input"
              value="anonymous"
              onChange={handleNameChange}
            />
          </div>

          <ul className="message-container" id="message-container">
            {/* These li elements are only for reference, and therefore, they are commented out... */}
            {/* <li className="message-left">
              <p className="message">
                lorem impsun
                <span>bluebird ● 26 July 10:40</span>
              </p>
            </li>
            <li className="message-right">
              <p className="message">
                lorem impsun
                <span>bluebird ● 26 July 10:40</span>
              </p>
            </li>
            <li className="message-feedback">
              <p className="feedback" id="feedback">✍️ killer is typing a message...</p>
            </li> */}
          </ul>

          <form onSubmit={handleSubmit} className="message-form" id="message-form">
            <input
              onChange={handleMessageChange}
              type="text"
              name="message"
              id="message-input"
              className="message-input"
            />
            <div className="v-divider"></div>
            <button type="submit" className="send-button">
              send <span><i className="fas fa-paper-plane"></i></span>
            </button>
          </form>
        </div>
        <h3 className="clients-total" id="client-total">Total clients: 2</h3>
    
    </>
  );
}

export default Chat;