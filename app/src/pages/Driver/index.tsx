import { useEffect, useRef, useState } from 'react';
import { 
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    Switch,
    Table, 
    TableBody, 
    TableCell, 
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from '@mui/material';

import { useNotify } from '../../hooks/Notification';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu';
import { Add, Check, Close, Delete, Edit, FileUpload, Save } from '@mui/icons-material';


interface IDriver {
    num_doc: string;
    validy_doc: Date;
    name: string;
    attachment: string;
    status: boolean;
}

export const Driver = () => {
    const [drivers, setDrivers] = useState<IDriver[]>([]);
    const [editDriver, setEditDriver] = useState<IDriver>({} as IDriver);
    const [openDlgEdit, setOpenDlgEdit] = useState<boolean>(false);
    const [widthImage, setWidthImage] = useState<string>('50px');
    const [openDlgRegister, setOpenDlgRegister] = useState<boolean>(false);
    const [openDlgDelete, setOpenDlgDelete] = useState<boolean>(false);
    const [driverSelectDelete, setDriverSelectDelete] = useState<string>('');
    const { notification } = useNotify();
    const attachmentRef = useRef<HTMLInputElement>();
    const [attachmentLabel, setAttachmentLabel] = useState<string>('Anexar docto');

    useEffect(() => {
        (
            async () => {

                try {
                    const response = await api.get('/driver/');
                    setDrivers(response.data);
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    })
                }
            }
        )()
    }, []);

    const handleToogleDialogEdit = async (num_doc: string) => {
        await loadEditData(num_doc, openDlgEdit);
        setOpenDlgEdit(!openDlgEdit);
    }

    const handleToogleDialogDelete = async (num_doc: string) => {
        setDriverSelectDelete(num_doc);
        setOpenDlgDelete(!openDlgEdit);        
    }
    
    const handleDeleteCancel = () => {
        setDriverSelectDelete('');
        setOpenDlgDelete(false);
    }

    const handleDeleteComfirmation = async () => {

        try {
            await api.delete(`/driver/${driverSelectDelete}`);

            setDrivers(drivers.filter(driver => driver.num_doc !== driverSelectDelete));

           notification({
                message: 'Motorista excluído com sucesso',
                type: 'success'
            });
        }catch(error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            });
        }
        setOpenDlgDelete(false);
    }

    const loadEditData = async (num_doc: string, clear: boolean) => {
        
        const response = await api.get(`/driver/${num_doc}`);

        setEditDriver(response.data);
    }

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        try {
            const response = await api.patch('/driver', {
                id: data.get('num_doc'), // teste
                num_doc: data.get('num_doc'),
                validy_doc: data.get('validy_doc'),
                name: data.get('name'),
                attachment: data.get('attachment'),
                status: data.get('status')
            });            

            setDrivers( drivers.map( driver => {
                    if(driver.num_doc === data.get('num_doc')) {
                        driver.validy_doc = new Date(data.get('validy_doc') as string),
                        driver.name = data.get('name') as string,
                        driver.attachment = data.get('attachment') as string,
                        driver.status = Boolean(data.get('status'))
                    }

                    return driver;
                } )
            )

            setOpenDlgRegister(false);

            notification({
                message: 'Moitorista atualizado com sucesso',
                type: 'success'
            });

       } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            });
       }
    };

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        try {
                const response = await api.post('/driver', {
                    num_doc: data.get('num_doc'),
                    validy_doc: data.get('validy_doc'),
                    name: data.get('name'),
                    attachment: data.get('attachment'),
                    status: true
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );           

            setDrivers([...drivers, response.data]);

            setOpenDlgRegister(false);

            notification({
                message: 'Motorista cadastrado com sucesso',
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
            <h2>Motoristas</h2>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Documento</TableCell>
                    <TableCell>Validade</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Anexo</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align="right">Opções</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {drivers.map((driver) => (
                    <TableRow key={driver.num_doc}>
                    <TableCell>{driver.num_doc}</TableCell>
                    <TableCell>{new Date(driver.validy_doc).toLocaleDateString('pt-br')}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>
                        <img
                            style={{ maxWidth: widthImage, cursor: 'pointer' }}
                            src={driver.attachment} 
                            alt="CNH Motorista" 
                            onClick={() => setWidthImage( ( widthImage === '50px') ? '500px' : '50px')}
                        />    
                    </TableCell>
                    <TableCell align='center' >
                        {
                            driver.status ? 
                            <Tooltip title='Ativo'>
                                <Check htmlColor='green' />
                            </Tooltip>  
                            :
                            <Tooltip title='Inativo'>
                                <Close htmlColor='red' />
                            </Tooltip>

                        }
                    </TableCell>
                    <TableCell align='right'>
                    <Tooltip title='Editar'>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Editar motorista"
                                onClick={() => handleToogleDialogEdit(driver.num_doc)}
                                >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Excluir'>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Excluir motorista"
                                onClick={() => handleToogleDialogDelete(driver.num_doc)}
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
                    width: '25ch',
                    marginTop: '5ch'
                }}
                onClick={() => setOpenDlgRegister(true)}
            >
                Novo Motorista
            </Button>

            <Dialog
                open={openDlgEdit}
                onClose={() => {
                    setOpenDlgEdit(false);
                    setAttachmentLabel('Anexar docto');
                }}
            >
                <DialogTitle>Editar Motorista</DialogTitle>

                <DialogContent>                    
                    <Box 
                        component='form'
                        onSubmit={handleEditSubmit}
                        noValidate
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                        <div>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='name'
                                label='Nome'
                                name='name'
                                sx={{ m: 1, width: '60ch' }}
                                value={editDriver.name}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='num_doc'
                                label='Documento'
                                name='num_doc'
                                sx={{ m: 1, width: '18ch' }}
                                disabled
                                value={editDriver.num_doc}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='validy_doc'
                                label='Vencimento'
                                name='validy_doc'
                                sx={{ m: 1, width: '18ch' }}
                                value={editDriver.validy_doc}
                            />
                
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={editDriver.status ? true : false}
                                            size='small'
                                            onChange={() => setEditDriver({...editDriver, status: !editDriver.status} )}
                                            />
                                    } 
                                    label={`Status (${editDriver.status ? 'Ativo' : 'Inativo'})`}
                                    sx={{ m: 1, width: '25ch' }}
                                />
                            </FormControl>
                        
                        </div>

                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="error"
                                endIcon={<Close />}
                                onClick={() => setOpenDlgEdit(false)}
                                type='button'
                            >
                                Fechar
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

            <Dialog
                open={openDlgRegister}
                onClose={() => {
                    setOpenDlgRegister(false);
                    setAttachmentLabel('Anexar docto');
                }}
            >
                <DialogTitle>Cadastrar Motorista</DialogTitle>

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
                                id='name'
                                label='Nome'
                                name='name'
                                sx={{ m: 1, width: '60ch' }}
                                required
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='num_doc'
                                label='Documento'
                                name='num_doc'
                                sx={{ m: 1, width: '18ch' }}
                                required
                            />
                            <TextField
                                margin='normal'
                                type='date'
                                InputLabelProps={{ shrink: true, required: true }}
                                fullWidth
                                id='validy_doc'
                                label='Vencimento'                                
                                name='validy_doc'
                                sx={{ m: 1, width: '18ch' }}
                            />
                            <div
                                style={{
                                    width: '18ch',
                                    height: '6.2ch',
                                    margin: '0px',
                                    paddingTop: '15px',
                                    paddingBottom: '4px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    borderColor: 'rgb(0 0 0 / 40%)',
                                    borderStyle: 'dashed',
                                    borderRadius: '4px',
                                    borderWidth: '1px',     
                                    position: 'absolute',
                                    right: '25px',
                                    bottom: '9px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    attachmentRef.current?.click()
                                }}
                            >
                                <FileUpload  htmlColor='rgb(0 0 0 / 60%)' />
                                <span
                                    style={{ 
                                        marginLeft: '8px',
                                        overflowX: 'hidden',
                                        
                                    }}
                                >
                                    {attachmentLabel}
                                </span>


                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='attachment'                             
                                    name='attachment'
                                    sx={{ display: 'none' }}
                                    type='file'
                                    inputRef={attachmentRef}
                                    onChange={() => {
                                        let file = attachmentRef.current?.files;
                                        
                                        setAttachmentLabel( file ? file[0].name : 'Anexar docto');
                                    }}
                                />    
                            </div>
                        
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

            <Dialog
                open={openDlgDelete}
                onClose={() => setOpenDlgDelete(false)}
            >
                <DialogTitle>Excluir Registro</DialogTitle>

                <DialogContent>
                    <DialogActions>
                        <Button 
                            variant="contained" 
                            color="error"
                            onClick={handleDeleteCancel}
                            type='button'
                        >
                            Não
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleDeleteComfirmation}
                            type='button'
                        >
                            Sim
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>

            

        </Menu>
    )

}