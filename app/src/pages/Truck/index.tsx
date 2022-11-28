import React, { useEffect, useState } from 'react';
import { 
    IconButton,
    Table, 
    TableBody, 
    TableCell, 
    TableHead,
    TableRow,
    Tooltip,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    Switch,
    DialogActions,
    Button
} from '@mui/material';
import {
    Add,
    Check,
    Close,
    Delete,
    Edit,
    Save
} from '@mui/icons-material'

import { useNotify } from '../../hooks/Notification';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu';

interface ITruck {
    plate: string;
    model: string;
    brand: string;
    type: string;
    weigth: string;
    capacity: string;
    status: boolean;
}

export const Truck = () => {
    const [trucks, setTrucks] = useState<ITruck[]>([]);
    const [editTruck, setEditTruck] = useState<ITruck>({} as ITruck);
    const [openDlgEdit, setOpenDlgEdit] = useState<boolean>(false);
    const [openDlgRegister, setOpenDlgRegister] = useState<boolean>(false);
    const [openDlgDelete, setOpenDlgDelete] = useState<boolean>(false);
    const [truckSelectDelete, setTruckSelectDelete] = useState<string>('');
    const { notification } = useNotify();

    useEffect(() => {
        (
            async () => {

                try {
                    const response = await api.get('/truck/');
                    setTrucks(response.data);
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    })
                }
            }
        )()
    }, []);

    const handleToogleDialogEdit = async (plate: string) => {
        await loadEditData(plate, openDlgEdit);
        setOpenDlgEdit(!openDlgEdit);
    }

    const handleToogleDialogDelete = async (plate: string) => {
        setTruckSelectDelete(plate);
        setOpenDlgDelete(!openDlgEdit);        
    }

    const handleDeleteComfirmation = async () => {

        try {
            await api.delete(`/truck/${truckSelectDelete}`);

            setTrucks(trucks.filter(truck => truck.plate !== truckSelectDelete));

           notification({
                message: 'Veículo excluído com sucesso',
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

    const handleDeleteCancel = () => {
        setTruckSelectDelete('');
        setOpenDlgDelete(false);
    }

    const loadEditData = async (plate: string, clear: boolean) => {
        
        const response = await api.get(`/truck/${plate}`);

        setEditTruck(response.data);
    }

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        try {
            
            await api.patch('/truck', {
                plate: data.get('plate'),
                brand: data.get('brand'),
                model: data.get('model'),
                type: data.get('type'),
                weigth: data.get('weigth'),
                capacity: data.get('capacity'),
                status: data.get('status')
            });

            setTrucks( trucks.map(truck => {
                    if(truck.plate === data.get('plate')) {
                        truck.brand = data.get('brand') as string,
                        truck.model = data.get('model') as string,
                        truck.type = data.get('type') as string,
                        truck.weigth = data.get('weigth') as string,
                        truck.capacity = data.get('capacity') as string,
                        truck.status = data.get('status') ? true : false
                    }

                    return truck;
                } )
            )

            setOpenDlgEdit(false);

            notification({
                message: 'Veículo atualizado com sucesso',
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
            const response = await api.post('/truck', {
                plate: data.get('plate'),
                brand: data.get('brand'),
                model: data.get('model'),
                type: data.get('type'),
                weigth: data.get('weigth'),
                capacity: data.get('capacity'),
                status: true
            });

            setTrucks([...trucks, response.data]);

            setOpenDlgRegister(false);

            notification({
                message: 'Veículo cadastrado com sucesso',
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
            <h2>Veículos</h2>
            <Table size="small" sx={{ minwidth: 700 }}>
                <TableHead>
                <TableRow>
                    <TableCell>Placa</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Tara</TableCell>
                    <TableCell>Capacidade</TableCell>
                    <TableCell align='center' >Status</TableCell>
                    <TableCell align="right">Opções</TableCell>
                </TableRow>
                </TableHead> 
                <TableBody>
                {trucks.map((truck) => (
                    <TableRow key={truck.plate}>
                    <TableCell>{truck.plate}</TableCell>
                    <TableCell>{truck.brand}</TableCell>
                    <TableCell>{truck.model}</TableCell>
                    <TableCell>{truck.type}</TableCell>
                    <TableCell>{truck.weigth}</TableCell>
                    <TableCell>{truck.capacity}</TableCell>
                    <TableCell align='center'>
                        {
                            truck.status ? 
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
                                aria-label="Editar veículo"
                                onClick={() => handleToogleDialogEdit(truck.plate)}
                                >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Excluir'>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Excluir veículo"
                                onClick={() => handleToogleDialogDelete(truck.plate)}
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
                Novo Veículo
            </Button>

            <Dialog
                open={openDlgEdit}
                onClose={() => setOpenDlgEdit(false)}
            >
                <DialogTitle>Editar Veículo</DialogTitle>

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
                                id='plate'
                                label='Placa'
                                name='plate'
                                sx={{ m: 1, width: '15ch', display: 'none' }}
                                value={editTruck.plate}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='plate_view'
                                label='Placa'
                                name='plate_view'
                                sx={{ m: 1, width: '15ch' }}
                                value={editTruck.plate}
                                disabled
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='brand'
                                label='Marca'
                                name='brand'
                                sx={{ m: 1, width: '21ch' }}
                                defaultValue={editTruck.brand}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='model'
                                label='Modelo'
                                name='model'
                                sx={{ m: 1, width: '20ch' }}
                                defaultValue={editTruck.model}
                            />
                        
                            <TextField
                                margin='normal'
                                fullWidth
                                id='type'
                                label='Tipo'
                                name='type'
                                sx={{ m: 1, width: '18ch' }}
                                defaultValue={editTruck.type}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='weigth'
                                label='Tara'
                                name='weigth'
                                sx={{ m: 1, width: '19ch' }}
                                defaultValue={editTruck.weigth}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='capacity'
                                label='Capacidade'
                                name='capacity'
                                sx={{ m: 1, width: '19ch' }}
                                defaultValue={editTruck.capacity}
                            />
                
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={editTruck.status ? true : false}
                                            size='small'
                                            onChange={() => setEditTruck({...editTruck, status: !editTruck.status} )}
                                            name='status'
                                            id='status'
                                            />
                                    } 
                                    label={`Status (${editTruck.status ? 'Ativo' : 'Inativo'})`}
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
                onClose={() => setOpenDlgRegister(false)}
            >
                <DialogTitle>Cadastrar Veículo</DialogTitle>

                <DialogContent>                    
                    <Box 
                        component='form'
                        onSubmit={handleRegisterSubmit}
                        noValidate
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                        <div>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='plate'
                                label='Placa'
                                name='plate'
                                sx={{ m: 1, width: '15ch' }}
                                required
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='brand'
                                label='Marca'
                                name='brand'
                                sx={{ m: 1, width: '22ch' }}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='model'
                                label='Modelo'
                                name='model'
                                sx={{ m: 1, width: '19ch' }}
                            />
                        
                            <TextField
                                margin='normal'
                                fullWidth
                                id='type'
                                label='Tipo'
                                name='type'
                                sx={{ m: 1, width: '18ch' }}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='weigth'
                                label='Tara'
                                name='weigth'
                                sx={{ m: 1, width: '19ch' }}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='capacity'
                                label='Capacidade'
                                name='capacity'
                                sx={{ m: 1, width: '19ch' }}
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