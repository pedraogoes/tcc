import {
    createContext,
    useCallback,
    useContext,
    useState,
    ReactNode
} from 'react'
import { api } from '../services/api';

interface IUser {
    id: string;
    name: string;
    email: string;
    type: string;
    business: string;
}

interface IAuthenticateState {
    user: IUser;
    token: string;
}

interface ISignInCredentials {
    email: string;
    password: string;
}

interface IAuthenticateContextData {
    user: IUser;
    signIn(credentials: ISignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<IAuthenticateContextData>({} as IAuthenticateContextData);

export const AuthenticateProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<IAuthenticateState>( () => {
        const token = localStorage.getItem('@App:token');
        const user = localStorage.getItem('@App:user');

        if(token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }

        return {} as IAuthenticateState;

    });

    const signIn = useCallback( async ({ email, password }: ISignInCredentials) => {
        const response = await api.post('/session', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@App:token', token);
        localStorage.setItem('@App:user', JSON.stringify(user));

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@App:token');
        localStorage.removeItem('@App:user');
        setData({} as IAuthenticateState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): IAuthenticateContextData {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('Não encontrado contexto');
    }
    return context;
}