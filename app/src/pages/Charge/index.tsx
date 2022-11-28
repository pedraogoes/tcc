import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    FormControl,
    DialogActions,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    Tooltip
} from '@mui/material';
import {
    Add,
    Close,
    KeyboardArrowDown,
    KeyboardArrowUp,
    Save,
    CompareArrows,
    Delete
} from '@mui/icons-material'
import { Menu } from '../../components/Menu';
import { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNotify } from '../../hooks/Notification';

interface IDriver {
    num_doc: string;
    name: string;
}

interface ITruck {
    plate: string;
}

interface IInvoice {
    id: string;
    nfe_number: string;
    nfe_gross_weight: string;
}

interface IChargeItems {
    invoice: {
        id: string;
        nfe_number: string;
        landing: string;
        nfe_gross_weight: string;
    }
}

interface ICharge {
    id: number;
    status: string;
    freight_value: number;
    driver: string;
    truck: string;
    cte: string;
}

var reload = false;

function Row(props: {charge: ICharge}) {
    const [open, setOpen] = useState<boolean>(false);    
    const { charge } = props;
    const [items, setItems] = useState<IChargeItems[]>([]);
    const { notification } = useNotify();

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await api.get(`/charge/items/${charge.id}`);                    

                    setItems(response.data);
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    });
                }
            }
        )()
    }, []);

    const handleDeleteCharge = async (id: number) => {
        try {
            await api.delete(`/charge/${id}`);
            reload = true;
            notification({
                message: 'Carga excluida com sucesso!',
                type: 'success'
            });
        } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            });
        }
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label='abrir linha'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {charge.id}
                </TableCell>
                <TableCell>{charge.driver}</TableCell>
                <TableCell>{charge.truck}</TableCell>
                <TableCell>
                    {charge.freight_value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell>

                    <Tooltip title='Emitir CT-e'>
                        <IconButton
                            aria-label='Emitir CT-e'
                            size='small'
                            onClick={() => {}}
                            color='success'
                        >
                            <CompareArrows />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Excluir Carga'>
                        <IconButton
                            aria-label='Excluir Carga'
                            size='small'
                            onClick={() => handleDeleteCharge(charge.id)}
                            color='error'
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    
                </TableCell>

            </TableRow>
            <TableRow
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }}
            >
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0}} 
                    colSpan={6}
                >
                    <Collapse
                        in={open} 
                        timeout="auto" 
                        unmountOnExit
                    >
                        <Box sx={{ margin: 1}}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component= 'div'
                            >
                                Itens
                            </Typography>
                        </Box>
                        <Table
                            size='small'
                            aria-label='purchases'
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>nº Nota</TableCell>
                                    <TableCell>Embraque</TableCell>
                                    <TableCell>Peso Bruto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map( (item) => (
                                    <TableRow key={item.invoice.id}>
                                        <TableCell>{item.invoice.nfe_number}</TableCell>
                                        <TableCell>{item.invoice.landing}</TableCell>
                                        <TableCell>{item.invoice.nfe_gross_weight}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>

                </TableCell>

            </TableRow>
        </>
    )
}

export const Charge = () => {
    const [charges, setCharges] = useState<ICharge[]>([]);
    const { notification } = useNotify();
    const [openDlgRegister, setOpenDlgRegister] = useState<boolean>(false);
    const [driversList, setDriversList] = useState<IDriver[]>([]);
    const [trucksList, setTrucksList] = useState<ITruck[]>([]);
    const [invoiceList, setInvoiceList] = useState<IInvoice[]>([]);

    const [driver, setDriver] = useState<string>('');
    const [truck, setTruck] = useState<string>('');
    const [invoices, setInvoices] = useState<string[]>([]);

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        try {
            const response = await api.post('/charge', {
                driver,
                truck,
                freight_value: data.get('freight_value'),
                items: invoices
            });            

            setCharges([...charges, response.data]);

            setOpenDlgRegister(false);

            setDriver('');
            setTruck('');
            setInvoiceList([]);

            notification({
                message: 'Carga cadastrada com sucesso',
                type: 'success'
            });

       } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            });
       }
    }

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await api.get('/charge');
                    setCharges(response.data);
                    reload = false;
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    });
                }
            }
        )()
    }, [reload]);

    const handleLoadDataRegister = async () => {
        api.get('/driver').then(response => {
            setDriversList(response.data);
        });

        api.get('/truck').then(response => {
            setTrucksList(response.data);
        });

        api.get('/invoice/charge').then(response => {
            setInvoiceList(response.data);
        })
    }

    const handleChangeSelectDriver = (e: SelectChangeEvent) => {
        setDriver(e.target.value);
    }

    const handleChangeSelectTruck = (e: SelectChangeEvent) => {
        setTruck(e.target.value);
    }

    const handleChangeSelectInvoice = (e: ChangeEvent<HTMLSelectElement>) => {
        const { options } = e.target;
        const value: string[] = [];

        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                    value.push(options[i].value);
                }
        }
        setInvoices(value);
    }

    return (
        <Menu>
            <h2>Cargas</h2>
            <TableContainer component={Paper}>
                <Table
                    aria-label='collapse table'
                >
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>nº Carga</TableCell>
                            <TableCell>Doc motorista</TableCell>
                            <TableCell>Veículo</TableCell>
                            <TableCell>Valor frete</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            charges.map(charge => (
                                <Row key={charge.id}  charge={charge} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button 
                variant="contained" 
                color="success"
                endIcon={<Add />}
                sx={{ 
                    width: '25ch',
                    marginTop: '5ch'
                }}
                onClick={() => {
                    handleLoadDataRegister();
                    setOpenDlgRegister(true);
                }}
            >
                Nova Carga
            </Button>

            <Dialog
                open={openDlgRegister}
                onClose={() => {
                    setOpenDlgRegister(false);
                }}
            >
                <DialogTitle>Criar Carga</DialogTitle>

                <DialogContent>                    
                    <Box 
                        component='form'
                        onSubmit={handleRegisterSubmit}
                        noValidate
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                        <div>
                            <FormControl
                                sx={{m: 2, minWidth: 220 }}
                            >
                                <InputLabel id='label-driver' >Motorista</InputLabel>
                                <Select
                                    labelId='label-driver'
                                    id='driver'
                                    value={driver}
                                    label='Selecione'
                                    onChange={handleChangeSelectDriver}
                                >
                                    {
                                        driversList.map(driver => (
                                            <MenuItem value={driver.num_doc} >{driver.name}</MenuItem>
                                        ))
                                    }                                    
                                </Select>
                            </FormControl>

                            <FormControl
                                sx={{m: 2, minWidth: 130 }}
                            >
                                <InputLabel id='label-truck' >Veículo</InputLabel>
                                <Select
                                    labelId='label-truck'
                                    id='truck'
                                    value={truck}
                                    label='Selecione'
                                    onChange={handleChangeSelectTruck}
                                >
                                    {
                                        trucksList.map(truck => (
                                            <MenuItem value={truck.plate} >{truck.plate}</MenuItem>
                                        ))
                                    }                                    
                                </Select>
                            </FormControl>

                            <TextField
                                margin='normal'
                                fullWidth
                                id='freight_value'
                                label='Frete'
                                name='freight_value'
                                sx={{ m: 2, width: 100 }}
                                type='text'
                            />

                            <InputLabel id='label-invoice' sx={{ marginLeft: 2 }} >Notas Fiscais</InputLabel> 
                            <Select
                                sx={{m: 2, minWidth: 515 }}
                                native
                                multiple
                                id='invoice'
                                value={invoices}
                                onChange={handleChangeSelectInvoice}
                            >
                                {
                                    invoiceList.map(invoice => (
                                        <option value={invoice.id} key={invoice.id}>
                                            {invoice.nfe_number} - Peso Bruto: {invoice.nfe_gross_weight}
                                        </option>
                                    ))
                                }                                    
                            </Select>
                                                
                        
                        </div>

                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="error"
                                endIcon={<Close />}
                                onClick={() => setOpenDlgRegister(false)}
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

        </Menu>
    )

}