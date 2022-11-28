import { useEffect, useState } from 'react';
import { 
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material';

import { useNotify } from '../../hooks/Notification';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu';
import { Add, Close, Delete, Edit, Save } from '@mui/icons-material';
import { useAuth } from '../../hooks/Authenticate';

interface IBusiness {
    code: string;
    name: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    type: string;
    business: string;
}

export const Business = () => {
    const [business, setBusiness] = useState<IBusiness>({} as IBusiness);
    const { notification } = useNotify();
    const [openDlgRegister, setOpenDlgRegister] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        (
            async () => {

                try {
                    const response = await api.get(`/business`);
                    setBusiness(response.data);
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    })
                }
            }
        )()
    }, []);

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);        
    
        try {
            const response = await api.post('/business', {
                    code: data.get('code'),
                    name: data.get('name'),
                    type: user.type,
                    certificate: '',
                    cert_attachment: ''
                }
            );

            setBusiness(response.data);

            setOpenDlgRegister(false);

            const userCookie = localStorage.getItem('@App:user') as string;

            const updateUserCookie = JSON.parse(userCookie) as IUser;

            updateUserCookie.business = response.data.code;

            localStorage.setItem('@App:user', JSON.stringify(updateUserCookie));

            notification({
                message: 'Empresa cadastrada com sucesso',
                type: 'success'
            });

       } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            });
       }
    };    

    return (
        <Menu>
            <h2>Empresa</h2>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Opções</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={business.code}>
                    <TableCell>{business.code}</TableCell>
                    <TableCell>{business.name}</TableCell>
                    <TableCell align='right'>
                        <Tooltip title='Editar'>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='Editar Empresa'
                                onClick={() => {}}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Excluir'>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='Excluir Empresa'
                                onClick={() => {}}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                    </TableRow>
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
                onClick={() => setOpenDlgRegister(true)}
                disabled={(business.code) ? true : false}
            >
                Cadastrar Empresa
            </Button>

            <Dialog
                open={openDlgRegister}
                onClose={() => {
                    setOpenDlgRegister(false);
                }}
            >
                <DialogTitle>Cadastrar Empresa</DialogTitle>

                <DialogContent>                    
                    <Box 
                        component='form'
                        onSubmit={handleRegisterSubmit}
                        noValidate
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                       <div
                        style={{
                            position: 'relative'
                        }} 
                       >
                            <TextField
                                margin='normal'
                                fullWidth
                                id='code'
                                label='CNPJ'
                                name='code'
                                sx={{ m: 1, width: '60ch' }}
                                required
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='name'
                                label='Nome'
                                name='name'
                                sx={{ m: 1, width: '60ch' }}
                                required
                            />                         
                        
                        </div>

                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="error"
                                endIcon={<Close />}
                                onClick={() => setOpenDlgRegister(false)}
                                type='button'
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                                endIcon={<Save />}
                                type='submit'
                            >
                                Salvar
                            </Button>
                        </DialogActions>

                    </Box>
                    
                </DialogContent>

            </Dialog>

        </Menu>
    )

}