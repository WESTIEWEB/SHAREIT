import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import moment from "moment";
import Box from '@material-ui/core/Box'
import { ChatContainer, adminChatStyles, Online, Chat, Img, Head, OnlineSpan, ChatInputBox, ChatInput, ChatHead, TypoGraphy } from "./styles";
import { GrSend } from 'react-icons/gr';
import { BsPersonBadgeFill } from 'react-icons/bs'
import { VscCloseAll } from 'react-icons/vsc';
import Button from '@material-ui/core/Button';
import logo from '@/assets/logo2.svg';
import { useAppContext } from "@/context";
import { IContextInterface } from "@/interface";
import profile from '@/assets/profile.jpg'
import { Typography } from "@material-ui/core";
import { ICurrentUser } from "@/interface/currentUser";
import { onlineUsers } from '../../../../../../flick_project/src/index';
import { socketUri } from "@/utils";

const socketOptions = {
    path: '/socket.io',
    transports: ['websocket'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    credentials: true
  };
  
  const socket = io(socketUri,socketOptions);
  
  interface Message {
    message: string;
    sender: string;
  }
  interface Props {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  }
//   interface IProps {
//     handleChatClick: () => void;
//   }
interface IProps {
    currentUser: string;
    
}

const AdminChat = ({ currentUser } : IProps) => {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<Array<Object>>([]);
  const [messages, setMessages] = useState<Array<Record<string,any>>>([]);
  const [name, setName] = useState("anonymous");
  const [text, setText] = useState("");
  const [onwMessage, setOnwMessage] = useState(false);
  const sender = currentUser;
  const classes = adminChatStyles();
  const messageContainer = useRef<HTMLUListElement>(null);

  //get logged in user from local storage
  const user = JSON.parse(localStorage.getItem('userData') as string);
  console.log('sender', sender)
  const date = new Date();
  console.log('client-total', clientsTotal)
  useEffect(() => {
    socket.on("clients-total", (data) => {
        setClientsTotal(data);
        }
    );

    socket.on("online-users", (data) => {
        setOnlineUsers(data)
        console.log('Online users:', onlineUsers);
    } );

    socket.on("chat-users", (data) => {
        console.log('>>> users:', data);
    } );
    socket.emit('admin', (sender))

    socket.on("chat-message", (data) =>
     addMessageToUI(data?.sender === user?._id, data)
    );


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
  }, [sender]);

  function sendMessage(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text === "") return;

    const data = {
      message: text,
      sender: user?._id,
    };

    socket.emit("message", data);
    addMessageToUI(true, data);
    setText("");
  }

  function handleTextareaChange(e:React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    socket.emit("feedback", {
      feedback: `✍️ ${name} is typing a message`,
    });
  }
  console.log('text', text, name)
  
  function addMessageToUI(isOwnMessage: boolean, data: Message) {
    clearFeedback();
    const element = (
      <li className={isOwnMessage ? "message-right" : "message-left"}>
        {isOwnMessage !== true? <Img className={classes.chatProfile} src={user?.image} alt="profile"/>: '' }
        <p className="message">
          {data.message}
          <span className="message-span">
            {name} ●  
            {moment(date.getTime()).fromNow()}
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

    useEffect(scrollToBottom, [messages]);
    useEffect(() => {
        setName(user?.username)
    }, [user]);

  return (
    <Box className={classes.parent1}>
      <Box className={classes.parent}>
        <ChatContainer>
            <Online>
                <Box className={classes.online1}>
                    <input type="text" placeholder="search user" className={classes.search} />
                </Box>
                <hr style={{marginTop: '0', color: 'red'}} className={classes.hideIt}/>
                <Box className={classes.online}>
                    <Img src={profile} alt="profile"/>
                    <Head>
                        <TypoGraphy>
                            Rahila
                        </TypoGraphy>
                        <TypoGraphy>
                            Rahila says 'hello'
                        </TypoGraphy>
                    </Head>
                    <OnlineSpan>
                        {2}
                    </OnlineSpan>
                </Box>
                <Box className={classes.online}>
                    <Img src={profile} alt="profile"/>
                    <Head>
                        <TypoGraphy>
                            Rahila
                        </TypoGraphy>
                        <TypoGraphy>
                            Rahila says 'hello'                            
                        </TypoGraphy>
                    </Head>
                </Box>
            </Online>
            <div className={classes.hideIt}></div>
            <Box className={classes.chatBox}>
                <Box className={classes.title}>
                    <Img className={classes.chatProfile} src={user?.image} alt="profile"/>
                    <span>
                        {name}
                    </span>
                </Box>
                <Chat ref={messageContainer}>
                    {/* <Box className={classes.chatsRight}>
                        <ChatHead>
                            <Typography style={{fontSize:'14px', textAlign: 'left', width: 'auto'}} color="textPrimary" variant="h6">
                                Rahila says 'hello'                         
                            </Typography>
                        </ChatHead>
                    </Box>
                    <Box className={classes.chatsLeft}>
                        <Img className={classes.chatProfile} src={user?.image} alt="profile"/>
                        <ChatHead>
                            <Typography style={{fontSize:'14px', textAlign: 'left', width: 'auto'}} color="textPrimary" variant="h6">
                                Rahila says 'hello' i dh hd                            
                            </Typography>
                        </ChatHead>
                    </Box> */}
                    {
                        messages.map((message:any, index: number) =>
                        <React.Fragment key={index}>
                            {message}
                        </React.Fragment>
                        )
                    }
                </Chat>
                <ChatInputBox onSubmit={sendMessage}>
                        <ChatInput 
                            onChange={handleTextareaChange} 
                            type="text" value={text}
                            name="message"
                            id="message-input"
                        />
                        {/* <Box style={{height: '100%', width: '2px', background: 'black'}}></Box> */}
                        <Button type="submit" style={{height:'90%'}} variant="text">
                            <GrSend style={{fontSize:'1.3em'}} />
                        </Button>
                </ChatInputBox>
            </Box>
            <div className={classes.hideIt}></div>
        </ChatContainer>
      </Box>
    </Box>
  )
}

export default AdminChat
