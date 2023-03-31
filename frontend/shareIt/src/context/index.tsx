import { useContext, createContext, useState , useEffect} from 'react';
import { apiPost } from '../utils';
import { IUserInterface } from '../interface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IAppContext {
    children: React.ReactNode;
}

const AppContext = createContext<unknown | undefined>({});
const AppProvider = ({ children }: IAppContext) => {
    //set user state
    const [user, setUser] = useState<IUserInterface>({} as IUserInterface);
    //set form state
    const [form, setForm] = useState<Record<string, any>>({});

    // api call to authenicate user
    const authUser = async (input: IUserInterface) => {
        const engineURL = '/chat-engine/authenticate-chat-user'
        try {  
            const response = await apiPost(import.meta.env.VITE_APP_BASEURL + `${engineURL}`, input)
            if(response.status === 200) {
                console.log(response.data);
                setForm({ ...response.data });
            }
        } catch (error) {
            console.log(error);
        }
    }

     // Handle logout 
    const Logout = () => {
        localStorage.clear()
        window.location.href = "/home";
    }

    //Handle user login form submission
    const loginConfig = async (loginObj: IUserInterface) => {
        try{
            await apiPost(import.meta.env.VITE_APP_BASEURL + '/users/login', loginObj)
            .then((res) => {
                if(res.data.status == 'success') {
                    console.log(res.data);
                    toast.success(res.data.message);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', res.data.username);
                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 1000)
                }
            })

        }catch(err) {
            console.log(err);
        }
    }
  return (
    <AppContext.Provider value={{
        authUser,
        form,
        user,
        setUser,
        Logout,
        loginConfig
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
