import { useEffect, useState } from 'react';
import { 
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';

import { useNotify } from '../../hooks/Notification';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu';
import { useAuth } from '../../hooks/Authenticate';
import { Edit, Key } from '@mui/icons-material';

interface IProfile {
    id: string;
    name: string;
    email: string;
}

export const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<IProfile>({} as IProfile);
    const { notification } = useNotify();

    useEffect(() => {
        (
            async () => {

                try {
                    const response = await api.get(`/user/${user.id}`);
                    setProfile(response.data);
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    })
                }
            }
        )()
    }, []);

    return (
        <Menu>
            <h2>Perfil</h2>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Opções</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                    <TableRow key={profile.id}>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell align='right'>
                        <Tooltip title='Editar'>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='Editar Perfil'
                                onClick={() => {}}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Alterar Senha'>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='Alterar senha'
                                onClick={() => {}}
                            >
                                <Key />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                    </TableRow>
                
                </TableBody>
            </Table>
        </Menu>
    )

}