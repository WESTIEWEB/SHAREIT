import React from 'react'
import Chat from '../../components/chat'
import AuthForm from '../../components/authForm'
import { useAppContext } from '../../context'
import { IContextInterface } from '../../interface'

const ChatModal = () => {
    const { form } = useAppContext() as IContextInterface;
    //get username from local storage
    // const username = localStorage.getItem('username')
    let user: any;
    if(form.username){
      user = form;
    }
    console.log('form', form)
    const IsUser = () => {
        if(!user) {
          return <AuthForm />
        }
        else {return <Chat form={user} />}
    }
  return (
    <>
      <IsUser />
    </>
  )
}

export default ChatModal
