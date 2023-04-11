import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import moment from "moment";
import Box from '@material-ui/core/Box'
import { chatStyles, MessageBox, MessageForm, MessageInput } from "./styles";
import { GrSend } from 'react-icons/gr';
import { BsPersonBadgeFill } from 'react-icons/bs'
import { VscCloseAll } from 'react-icons/vsc';
import Button from '@material-ui/core/Button';
import logo from '@/assets/logo2.svg';
import { useAppContext } from "@/context";
import { IContextInterface } from "@/interface";
// import "./style.css";
const socketOptions = {
  path: '/socket.io',
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
};

const socket = io('http://localhost:3600',socketOptions);

interface Message {
  name: string;
  message: string;
  dateTime: Date;
}
interface Props {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
interface IProps {
  handleChatClick: () => void;
}
export default function Chat() {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [messages, setMessages] = useState<Array<Record<string,any>>>([]);
  const [name, setName] = useState("anonymous");
  const [text, setText] = useState("");
  
  //get state from contextApi
  const { handleChatModal } = useAppContext() as unknown as IContextInterface;
  //get username from local storage
  const user = localStorage.getItem('username');
  const classes = chatStyles();
  const messageContainer = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on("clients-total", (data) => {
      setClientsTotal(data);
    });

    socket.on("chat-message", (data) => addMessageToUI(false, data));

    socket.on("feedback", (data) => {
      clearFeedback();
      const element = (
        <li className="message-feedback">
          <p className="feedback" id="feedback">
            {data.feedback}
          </p>
        </li>
      );
      setMessages((prevMessages) => [...prevMessages, element]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function sendMessage(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text === "") return;

    const data = {
      name,
      message: text,
      dateTime: new Date(),
    };
    socket.emit("message", data);
    addMessageToUI(true, data);
    setText("");
  }

  function handleInputChange(e:any) {
    setName(e.target.value);
  }

  function handleTextareaChange(e:any) {
    setText(e.target.value);
    socket.emit("feedback", {
      feedback: `✍️ ${name} is typing a message`,
    });
  }

  function addMessageToUI(isOwnMessage: boolean, data: Message) {
    clearFeedback();
    const element = (
      <li className={isOwnMessage ? "message-right" : "message-left"}>
        <p className="message">
          {data.message}
          <span className="message-span">
            {data.name} ●  
            {moment(data.dateTime).fromNow()}
          </span>
        </p>
      </li>
    );
    setMessages((prevMessages) => [...prevMessages, element]);
  }

  function clearFeedback() {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => !message.props.className.includes("message-feedback"))
    );
  }

  function scrollToBottom() {
    if(!messageContainer.current) return;
    messageContainer.current.scrollTo(0, messageContainer.current.scrollHeight);
  }

  const User = () => {
    if(!user) {
      setName('anonymous')
      return (
        <input
            type="text"
            id="name-input"
            className={classes.nameInput}
            value={name}
            disabled
            maxLength={20}
            onChange={handleInputChange}
          />
      )
    }
    else {
      setName(user)
      return (
        <input
            type="text"
            id="name-input"
            className={classes.nameInput}
            value={name}
            maxLength={20}
            disabled
            onChange={handleInputChange}
          />
      )
    }

  }

  return (
    <Box className={classes.app}>
      <h1 className={classes.chatTitle}><img src={logo} alt="logo"/> <span>💬</span></h1>
      <span className={classes.closeChat} > <VscCloseAll onClick={handleChatModal}/></span>
      <Box className={classes.main}>
        <Box className={classes.name}>
          <span>
            <BsPersonBadgeFill />
          </span>
          {/* <input
            type="text"
            id="name-input"
            className="name-input"
            value={name}
            maxLength={20}
            onChange={handleInputChange}
          /> */}
          <User />
        </Box>

        <MessageBox ref={messageContainer}>
          {messages.map((message:any, index) => (
            <React.Fragment key={index}>{message}</React.Fragment>
          ))}
        </MessageBox>

        <MessageForm onSubmit={sendMessage}>
          <MessageInput
            type="text"
            name="message"
            id="message-input"
            value={text}
            onChange={handleTextareaChange}
          />
          <Box className={classes.Vboxider}></Box>
          <Button type="submit" className={classes.sendButton}>
            <GrSend />
          </Button>
        </MessageForm>
      </Box>
      <h3 className="clients-total" id="client-total">
        {/* Total clients: {clientsTotal} */}
      </h3>
    </Box>
  );
}
