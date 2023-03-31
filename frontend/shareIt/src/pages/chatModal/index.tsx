import React from 'react'
import Chat from '../../components/chat'
import AuthForm from '../../components/authForm'
import { useAppContext } from '../../context'
import { IContextInterface } from '../../interface'

const ChatModal = () => {
    const { form } = useAppContext() as IContextInterface;
    const user = form.data

    const IsUser = () => {
        if (!user) {
            return <AuthForm />
        } else {
            return <Chat form={form} />
        }
    } 
  return (
    <>
        <IsUser />
    </>
  )
}

export default ChatModal
