import Box from '@material-ui/core/Box'
import React from 'react';
import { BGImage, ChatIcon, PhoneImg, homeStyles } from './style';
import herogbImg from '../../assets/hero-bg.svg';
import phoneImg from '../../assets/phone-img.svg';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BsChatRightText } from 'react-icons/bs';
import ChatModal from '../../pages/chatModal';
import { useAppContext } from '@/context';
import { IContextInterface } from '@/interface';

const Home = () => {
    // const [showChat, setShowChat] = React.useState(false);

    // context props
    const { handleChatModal, showChat } = useAppContext() as IContextInterface;
    const classes = homeStyles();
    console.log('showChat', showChat)
    const handleChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleChatModal()
    }

    // call verifytoken when component mounts
    React.useEffect(() => {
        // verifyToken();
    }, [])

    const isAuth = localStorage.getItem('token');
    const GreetUser = () => {
        if(!isAuth) {
            return (
                <Link style={{textDecoration:'none'}} to='/login'>
                    <Button className={classes.button} variant='contained' color='primary'>
                        Get Started
                    </Button>
                </Link>
            )
        } 
        else {
            return (
                <Link style={{textDecoration:'none'}} to={''}>
                    <Button className={classes.button} variant='contained' color='primary'>
                        Hi {localStorage.getItem('username')}😎
                    </Button>
                </Link>
                
            )
        }
    }
  return (
    <>
        <Box className={classes.container}>
          <Box className={classes.contents}>
            <BGImage src={herogbImg} />
            <Box className={classes.title}>
                <Box className={classes.subtitle}>
                    <Typography className={classes.titleText} variant='h3'>
                        Payment Has <br/>Never Been This <br/> <span style={{color:'#2ebdb6'}}>easy</span>
                    </Typography>
                    <Typography className={classes.titleText1} variant='h6'>
                        One secure platform to pay, get paid, and manage all your <br/> finances better!
                    </Typography>
                    <Box className={classes.buttonDiv}>
                        <GreetUser />
                    </Box>
                </Box>
                <Box className={classes.phoneImage}>
                    <PhoneImg src={phoneImg} />
                </Box>
            </Box>
        
          </Box>
          <ChatIcon>
            <Button onClick={handleChatClick} className={classes.icons}>
                <BsChatRightText />
            </Button>
          </ChatIcon>
        </Box>
        {showChat && <ChatModal/>}
    </>
  )
}

export default Home
