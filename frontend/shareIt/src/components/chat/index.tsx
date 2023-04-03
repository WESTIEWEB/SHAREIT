import React from 'react'
import { chatStyles } from './styles'
import { Box } from '@material-ui/core';
import { PrettyChatWindow } from 'react-chat-engine-pretty'
import { projectID } from '@/utils';
import { useAppContext } from '@/context';
import { IContextInterface } from '@/interface';
import {
    MultiChatSocket,
    MultiChatWindow,
    useMultiChatLogic,
  } from 'react-chat-engine-advanced';

interface IChatProps {
    form: IContextInterface['form']
}

const Chat = (props: IChatProps) => {
    const chatProps = useMultiChatLogic(
        'a8cffafe-4a1d-4d70-ad2a-84ceb9752962',
        props.form.username,
        props.form.secret,
    )
    const classes = chatStyles();
    const { form } = useAppContext() as IContextInterface;
    console.log('form', props.form )
  return (
    <Box className={classes.chatContainer}>
      <Box className={classes.chatWindow}>
        {/* <PrettyChatWindow
            projectId = {projectID}
            username={props.form.data.username}
            secret={props.form.data.secret}
            height='100vh'
            style={{backgroundColor: '#fff !important'}}
        /> */}
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow 
          {...chatProps}
          renderChatHeader={(chat) => <div style={{background:'red', fontSize:'2em'}}> chat </div>}
        />
      </Box>
    </Box>
  )
}

export default Chat
