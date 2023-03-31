import { IUserInterface } from './userInterface';

export interface IContextInterface {
    authUser: (input: IUserInterface) => void;
    setUser: React.Dispatch<React.SetStateAction<{}>>;
    user: {
        username: string;
    },
    form: Record<string, any>;
    Logout: () => void;
    loginConfig: (loginObj: IUserInterface) => void;
}