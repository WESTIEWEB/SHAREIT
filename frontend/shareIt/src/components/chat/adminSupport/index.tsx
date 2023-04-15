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

const socketOptions = {
    path: '/socket.io',
    transports: ['websocket'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    credentials: true
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
//   interface IProps {
//     handleChatClick: () => void;
//   }
interface IProps {
    currentUser: string;
    
}

const AdminChat = ({ currentUser } : IProps) => {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<Array<Record<string,any>>>([]);
  const [messages, setMessages] = useState<Array<Record<string,any>>>([]);
  const [name, setName] = useState("anonymous");
  const [text, setText] = useState("");
  const sender = currentUser;
  const classes = adminChatStyles();
  const messageContainer = useRef<HTMLUListElement>(null);

  //get logged in user from local storage
  const user = JSON.parse(localStorage.getItem('userData') as string);
  
  useEffect(() => {
    socket.on("clients-total", (data) => {
        setClientsTotal(data);
        }
    );

    socket.on("online-users", (data) => setOnlineUsers(data));
    socket.emit('admin', (sender))

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
  }, [sender]);
  console.log('onlineUsers', onlineUsers)

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
                    <span className={classes.HiddenSpan}>
                        hello
                    </span>
                    <Head>
                        <TypoGraphy>
                            Rahila
                        </TypoGraphy>
                        <TypoGraphy>
                            Rahila says 'hello'                            
                        </TypoGraphy>
                    </Head>
                    <OnlineSpan>
                            {21}
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
                <Chat>
                    <Box className={classes.chatsRight}>
                        <ChatHead>
                            <Typography style={{fontSize:'14px', textAlign: 'left', width: 'auto'}} color="textPrimary" variant="h6">
                                Rahila says 'hello'                         
                            </Typography>
                        </ChatHead>
                    </Box>
                    <Box className={classes.chatsRight}>
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
                                Rahila says 'hello'                        
                            </Typography>
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
                    </Box>
                    <Box className={classes.chatsRight}>
                        <ChatHead>
                            <Typography style={{fontSize:'14px', textAlign: 'left', width: 'auto'}} color="textPrimary" variant="h6">
                                Rahila says 'hello'                           
                            </Typography>
                        </ChatHead>
                    </Box>
                </Chat>
                <ChatInputBox>
                        <ChatInput onChange={handleTextareaChange} type="text"/>
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
