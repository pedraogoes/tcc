import React, { 
    createContext, 
    ReactNode, 
    useCallback, 
    useContext, 
    useState 
} from "react";
import {
    Stack,
    Snackbar
} from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface ISnackbarProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}

interface INotification {
    notification(params: ISnackbarProps): void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationContext = createContext<INotification>({} as INotification);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    const handleClose = () => {            
        setOpen(false);
    };

    const notification = useCallback(({ message, type }: ISnackbarProps) => {
        setMessage(message);
        setType(type);
        setOpen(true);
    }, []);

    return (
        <NotificationContext.Provider value={{ notification }}>
        {children}
        <Stack spacing={2} sx={{ width: '100%', minWidth: '100px' }} >
            <Snackbar 
                open={open} 
                autoHideDuration={6000} 
                onClose={handleClose} 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
        </NotificationContext.Provider>
    );
}   

export function useNotify(): INotification {
    const context = useContext(NotificationContext);
    if(!context) {
        throw Error('Não encontrado contexto');
    }
    return context;
}