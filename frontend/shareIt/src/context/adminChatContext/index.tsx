import React, {useContext, createContext} from 'react'

interface IProps {
    children: React.ReactNode
}

const AdminChatContext = createContext<unknown | undefined>({})

const AdminChatProvider = ({ children }: IProps) => {
  return (
    <AdminChatContext.Provider 
        value={{
            
        }}
    >
      { children }
    </AdminChatContext.Provider>
  )
}

export default AdminChatProvider;
