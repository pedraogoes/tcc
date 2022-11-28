import { useEffect, useState } from 'react';
import { 
    Button,
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
import { Add, Delete, Edit } from '@mui/icons-material';

interface IUser {
    id: string;
    name: string;
    email: string;
}

export const User = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const { notification } = useNotify();

    useEffect(() => {
        (
            async () => {

                try {
                    const response = await api.get(`/user`);
                    setUsers(response.data);
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
            <h2>Usuários</h2>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Opções</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align='right'>
                        <Tooltip title='Editar'>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='Editar Usuário'
                                onClick={() => {}}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Excluir'>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='Excluir Usuário'
                                onClick={() => {}}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <Button 
                variant="contained" 
                color="success"
                endIcon={<Add />}
                sx={{ 
                    width: '30ch',
                    marginTop: '5ch'
                }}
                onClick={() => {}}
            >
                Cadastrar Usuário
            </Button>
        </Menu>
    )

}