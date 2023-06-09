import { IFormInterface ,IUserInterface,  IChat} from '@/interface';

export interface IContextInterface {
    authUser: (input: IUserInterface) => void;
    setUser: React.Dispatch<React.SetStateAction<{}>>;
    user: {
        username: string;
    },
    form: Record<string, any>;
    Logout: () => void;
    loginConfig: (loginObj: IUserInterface) => void;
    chatSecr: string;
    userName: string;
    userEmail: string;
    setChatSecr: React.Dispatch<React.SetStateAction<{}>>;
    getUserProfile: () => void;
    registerConfig: (registerObj: IFormInterface) => void;
    handleChatModal: () => void;
    showChat: boolean;
    createNewChatConfig: (file: IChat) => void;
    // verifyToken: () => void;
}