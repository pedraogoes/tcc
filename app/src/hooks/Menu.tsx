import { 
    createContext, 
    ReactNode, 
    useCallback, 
    useContext, 
    useState 
} from "react";

interface IStateMenu {
    state: boolean;
    stateMenu(open: boolean): void;
}

const MenuContext = createContext<IStateMenu>({} as IStateMenu);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState(true);

    const stateMenu = useCallback((state: boolean) => {
        setState(state);
    }, []);

    return (
        <MenuContext.Provider value={{ stateMenu, state }}>
            {children}        
        </MenuContext.Provider>
    );
}   

export function useStateMenu(): IStateMenu {
    const context = useContext(MenuContext);
    if(!context) {
        throw Error('Não encontrado contexto');
    }
    return context;
}