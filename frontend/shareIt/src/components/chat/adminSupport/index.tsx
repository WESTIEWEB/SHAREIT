import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import moment from "moment";
import Box from '@material-ui/core/Box'
import { ChatContainer, adminChatStyles, Online, Chat, Img, Head, OnlineSpan, ChatInputBox, ChatInput, ChatHead, TypoGraphy, Nav } from "./styles";
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
import { IOnlineUserInterface } from "@/interface/onlineUserInterface";
import NavBar from "@/components/Nav";
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
    owner: boolean;
    dateTime?: Date;
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

const AdminChat = () => {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [currentUser, setCurrentUser] = useState<IOnlineUserInterface>({} as IOnlineUserInterface);
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUserInterface[]>([]);
  const [messages, setMessages] = useState<Array<Record<string,any>>>([]);
  const [name, setName] = useState("anonymous");
  const [text, setText] = useState("");
  const [onwMessage, setOnwMessage] = useState(false);

  //get logged in user from local storage
  const user = JSON.parse(localStorage.getItem('userData') as string || '{}')
  const sender = user?._id;

  
  const classes = adminChatStyles();
  const messageContainer = useRef<HTMLUListElement>(null);
  const date = new Date();

  useEffect(() => {
    socket.on("clients-total", (data) => {
        setClientsTotal(data);
        }
    );
    
    if(sender) {
      socket.emit('admin', (sender))
    }
    socket.on("online-users", (data) => setOnlineUsers(data) );
    socket.on("chat-message", (data) =>{
      console.log('data', data)
      // data?.forEach((message: Message) => {
      //   addMessageToUI(message?.owner, message);
      // });
     addMessageToUI(data?.sender === user?._id, data)
    }
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
  // console.log('onlineUsers', onlineUsers)

  function sendMessage(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text === "") return;

    const data = {
      message: text,
      sender: user?._id,
      owner: true,
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
  
  function addMessageToUI(isOwnMessage: boolean, data: Message) {
    clearFeedback();
    const element = (
      <li className={isOwnMessage ? "message-right" : "message-left"}>
        {isOwnMessage !== true? <Img className={classes.chatProfile} src={currentUser?.image} alt="profile"/>: '' }
        <p className="message">
          {data.message}
          <span className="message-span">
            {currentUser.username} ●  
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
  
  // function that sets current user
  const handleOnlineUsers = (e:any) => {
    setCurrentUser(e)
  }

  // show chat with selected user
  const ChatMessages = () => {
    if(currentUser._id){
      return (
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
      )
    }
    return (
      <Chat ref={messageContainer}>
        <Typography variant="h6" color="textPrimary" style={{textAlign: 'center', marginTop: '20px'}}>
          Select a user to chat with
        </Typography>
      </Chat>
    )
  }
  return (
    <React.Fragment>
      <NavBar />
      <Box className={classes.parent1}>
        <Box className={classes.parent}>
          <ChatContainer>
              <Online>
                  <Box className={classes.online1}>
                      <input type="text" placeholder="search user" className={classes.search} />
                  </Box>
                  <hr style={{marginTop: '0', color: 'red', width: '90%'}} className={classes.hideIt}/>
                  {
                      onlineUsers?.map((item:IOnlineUserInterface, index:number) =>
                      <React.Fragment key={index}>
                          <Box onClick={(e:any) => handleOnlineUsers(item)} className={classes.online}>
                              <Img src={item.image} alt="image"/>
                              <span className={classes.HiddenSpan}>
                                  hello
                              </span>
                              <Head>
                                  <TypoGraphy>
                                      {item.username}
                                  </TypoGraphy>
                                  <TypoGraphy>
                                      Open message
                                  </TypoGraphy>
                              </Head>
                              <OnlineSpan>
                                      {2}
                              </OnlineSpan>
                          </Box>
                      </React.Fragment>
                      )
                  }
                  {/* <Box className={classes.online}>
                      <Img src={profile} alt="profile"/>
                      <Head>
                          <TypoGraphy>
                              Rahila
                          </TypoGraphy>
                          <TypoGraphy>
                              Rahila says 'hello'
                          </TypoGraphy>
                      </Head>
                  </Box> */}
              </Online>
              <div className={classes.hideIt}></div>
              <Box className={classes.chatBox}>
                  <Box className={classes.title}>
                      {currentUser._id && 
                      <React.Fragment>
                        <Img src={currentUser?.image} alt="profile"/>
                        <span>
                            {currentUser.username}
                        </span>
                      </React.Fragment>
                      }
                  </Box>
                  <ChatMessages />
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
    </React.Fragment>
  )
}

export default AdminChat
