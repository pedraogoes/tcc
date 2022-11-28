import { ReactNode } from 'react'
import { AuthenticateProvider } from './Authenticate';
import { NotificationProvider } from './Notification';
import { MenuProvider } from './Menu';

const AppProvider = ({ children }: { children: ReactNode }) => (
    <AuthenticateProvider>
        <NotificationProvider>
            <MenuProvider>
                {children}
            </MenuProvider>
        </NotificationProvider>
    </AuthenticateProvider>
)

export default AppProvider;