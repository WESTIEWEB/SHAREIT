import { useContext, createContext, useState , useEffect} from 'react';
import { apiGet, apiPost, apiPostChat, baseUrl } from '../utils';
import { IFormInterface, IUserInterface } from '../interface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Buffer } from 'safe-buffer';
import { IChat } from '@/interface/chatInterface';



interface IAppContext {
    children: React.ReactNode;
}

const AppContext = createContext<unknown | undefined>({});
const AppProvider = ({ children }: IAppContext) => {
    // create state for userEmail and userPassword
    const [userEmail, setUserEmail] = useState<undefined | unknown>('');
    const [userName, setUsername] = useState<undefined | unknown>('');
    //set user state
    const [user, setUser] = useState<IUserInterface>({} as IUserInterface);
    //set form state
    const [form, setForm] = useState<Record<string, any>>({});

    //state for showChat modal
    const [showChat, setShowChat] = useState<boolean>(false);

    //set chat secret
    const [chatSecr, setChatSecr] = useState<undefined | unknown>('');

    // api call to authenicate user
    const authUser = async (input: IUserInterface) => {
        const engineURL = '/chat-engine/authenticate-chat-user'
        try {  
            const response = await apiPost(import.meta.env.VITE_APP_BASEURL + `${engineURL}`, input)
            if(response.status === 200) {
                console.log(response.data);
                setForm({ ...response.data.data });
                console.log('form', form);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {}, [])

     // Handle logout 
    const Logout = () => {
        localStorage.clear()
        window.location.href = "/home";
    }

    //Handle user login form submission
    const loginConfig = async (loginObj: IUserInterface) => {
        try{
            await apiPost(baseUrl + '/users/login', loginObj)
            .then((res) => {
                if(res.data.status == 'success') {
                    console.log('data',res.data);
                    toast.success(res.data.message);
                    localStorage.setItem('userData', JSON.stringify(res.data.data));

                    //invoke authUser function
                    authUser({ username: res.data.data.username, secret: res.data.data.username });
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000)
                }
                return
            })

        }catch(err:any) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
    // ========= REGISTER USER ==========
    const registerConfig = async (registerObj: IFormInterface) => {
        try {
            const res = await apiPost(baseUrl + '/users/register', registerObj)
            
            if(res.data.status == 'success') {
                console.log('data',res.data);
                toast.success(res.data.error);
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000)
            }
            return
            
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    // ========== function to get user profile from db ==========
    const getUserProfile = async () => {
        try{
            const response = await apiGet(baseUrl + '/users/user/profile')
            if(response.status === 200) {
                console.log(response.data);
                setUserEmail(response.data.data.email)
                setUsername(response.data.data.username)
            }
        }catch(err:any) {
            console.log(err);
        }
    }

    //========================== Function showModal ==========================
    const handleChatModal = () => {
        setShowChat(!showChat)
    }

    //========================== Function that handles creating new chat ==========================
    const createNewChatConfig = async(file: IChat) => {
        const engineURL = '/chat-engine/create-new-chat'
        try {  
            const response = await apiPostChat(baseUrl + `${engineURL}`, file)
            if(response.status === 200) {
                console.log(response.data);
                setChatSecr(response.data.data);
                console.log('chatSecr', chatSecr);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Logout config
    const logOutConfig = () => {
        // localStorage.removeItem('userData')
        localStorage.clear()
        window.location.href = '/login'
    }
  return (
    <AppContext.Provider value={{
        authUser,
        form,
        user,
        setUser,
        Logout,
        loginConfig,
        chatSecr,
        setChatSecr,
        userName,
        userEmail,
        getUserProfile,
        registerConfig,
        handleChatModal,
        showChat,
        createNewChatConfig,
        logOutConfig
        
        // verifyToken
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}
