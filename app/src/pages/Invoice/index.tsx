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
    DialogActions,
    TextField,
    Select,
    InputLabel,
    Tooltip
} from '@mui/material';
import {
    Add,
    Save,
    Close,
    KeyboardArrowDown,
    KeyboardArrowUp,
    PlusOne,
    Delete,
    AttachMoney,
    Update,
    Widgets
} from '@mui/icons-material'
import { Menu } from '../../components/Menu';
import { Dropzone } from '../../components/Dropzone';
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNotify } from '../../hooks/Notification';
import { useAuth } from '../../hooks/Authenticate';

interface IInvoiceItems {
    id: string;
    description: string;
    value: number;
    gross_weight: number;
    net_weight: string;
}


interface IInvoice {
    id: string;
    nfe_number: string,
    nfe_gross_weight: number,
    nfe_net_weight: number,
    need_date: Date,
    freight_value: number,
    shipper: string,
    boarding: string,
    boarding_detail: string;
    landing: string,
    landing_detail: string;
    nfe_attachment: string,
}

type IInvoiceItemsCreate = Omit<IInvoiceItems, 'id'>
type IInvoiceCreate = Omit<IInvoice, 'id'>


function Row(props: {invoice: IInvoice}) {
    const [open, setOpen] = useState<boolean>(false);    
    const { invoice } = props;
    const [items, setItems] = useState<IInvoiceItems[]>([]);
    const { notification } = useNotify();
    const [openDlgFreight, setOpenDlgFreight] = useState<boolean>(false);
    const [openDlgGrossWeight, setOpenDlgGrossWeight] = useState<boolean>(false);

    const [newFreightValue, setNewFreightValue] = useState<number>(invoice.freight_value);
    const [newGrossWeight, setNewGrossWeight] = useState<number>(invoice.nfe_gross_weight);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await api.get(`/invoice/items/${invoice.id}`);

                    setItems(response.data);
                } catch (error: any) {
                    notification({
                        message: error.response.data.message,
                        type: 'error'
                    })
                }
            }
        )()
    }, []);

    const handleDeleteInvoice = async (invoice: string) => {
        try {
           await api.delete(`/invoice/${invoice}`);

           notification({
            message: 'Nota fiscal excluida com sucesso',
            type: 'success'
        });
        } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }


    const handleUpdateFreightInvoice = async ( invoice_id: string) => {
        try {
           await api.put(`/invoice/freight`, {
                invoice_id,
                freight_value: newFreightValue
           });

           invoice.freight_value = newFreightValue;

           setOpenDlgFreight(false)

           notification({
            message: 'Frete atualizado com sucesso',
            type: 'success'
        });
        } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }

    const handleUpdateGrossWeight = async ( invoice_id: string) => {
        try {
           await api.put(`/invoice/gross`, {
                invoice_id,
                gross_weight: newGrossWeight
           });

           invoice.nfe_gross_weight = newGrossWeight;

           setOpenDlgGrossWeight(false)

           notification({
            message: 'Peso Bruto atualizado com sucesso',
            type: 'success'
        });
        } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            })
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
                    {invoice.nfe_number}
                </TableCell>
                <TableCell>{new Date(invoice.need_date).toLocaleDateString('pt-br')}</TableCell>
                <TableCell>{invoice.landing}</TableCell>
                <TableCell>{invoice.nfe_gross_weight}</TableCell>
                <TableCell>
                    {invoice.freight_value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell>
                    <Tooltip title='Editar Peso'>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Editar peso bruto"
                            onClick={() => setOpenDlgGrossWeight(true)}
                            >
                            <Widgets />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Editar Frete'>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Editar valor do Frete"
                            onClick={() => setOpenDlgFreight(true)}
                            >
                            <AttachMoney />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Exluir Nota'>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Excluir Nota"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
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
                                    <TableCell>Descrição</TableCell>
                                    <TableCell>Valor Unit.</TableCell>
                                    <TableCell>NCM/SH.</TableCell>
                                    <TableCell>Unid.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map( (item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>
                                            {Number(item.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                        </TableCell>
                                        <TableCell>{item.gross_weight}</TableCell>
                                        <TableCell>{item.net_weight}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>

                </TableCell>

            </TableRow>
           
            <Dialog
                open={openDlgFreight}
                onClose={() => setOpenDlgFreight(false)}
            >
                <DialogTitle>Atualizar valor do frete</DialogTitle>
                <DialogContent>
                        <Box
                            lineHeight={4}
                        >
                            <TextField
                                margin='normal'
                                fullWidth
                                id='update_freight_value'
                                label='Valor Frete'
                                name='update_freight_value'
                                sx={{ m: 1, width: '18ch' }}
                                value={newFreightValue}
                                onChange={(event) => {
                                    setNewFreightValue(Number(event.target.value))
                                }}
                            />

                            <Button 
                                variant="contained" 
                                color="success"
                                endIcon={<Update />}
                                type='button'
                                onClick={() => handleUpdateFreightInvoice(invoice.id)}
                            >
                                Atualizar
                            </Button>

                        </Box>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openDlgGrossWeight}
                onClose={() => setOpenDlgGrossWeight(false)}
            >
                <DialogTitle>Atualizar Peso Bruto</DialogTitle>
                <DialogContent>
                        <Box
                            lineHeight={4}
                        >
                            <TextField
                                margin='normal'
                                fullWidth
                                id='update_freight_value'
                                label='Valor Frete'
                                name='update_freight_value'
                                sx={{ m: 1, width: '18ch' }}
                                value={newGrossWeight}
                                onChange={(event) => {
                                    setNewGrossWeight(Number(event.target.value))
                                }}
                            />

                            <Button 
                                variant="contained" 
                                color="success"
                                endIcon={<Update />}
                                type='button'
                                onClick={() => handleUpdateGrossWeight(invoice.id)}
                            >
                                Atualizar
                            </Button>

                        </Box>
                </DialogContent>
            </Dialog>

        </>
    )
}

export const Invoice = () => {
    const { user } = useAuth()
    const [invoices, setInvoice] = useState<IInvoice[]>([]);
    const { notification } = useNotify();
    const [openDlgXml, setOpenDlgXml] = useState<boolean>(false);
    const [openDlgNewInvoive, setOpenDlgNewInvoive] = useState<boolean>(false);


    const [newInvoice, setNewInvoice] = useState<IInvoiceCreate>({} as IInvoiceCreate);
    const [newItemsInvoice, setNewItemsInvoice] = useState<IInvoiceItemsCreate[]>([]);

    const [descriptionItem, setDescriptionItem] = useState<string>('');
    const [valueItem, setValueItem] = useState<string>('');
    const [grossWeightItem, setGrossWeightItem] = useState<string>('');
    const [netWeightItem, setNetWeightItem] = useState<string>('');

    const loadingInvoices = async () => {
        try {
            const response = await api.get('/invoice');
            setInvoice(response.data);
        } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            })
        }
    }

    useEffect(() => {
        (
            async () => {
                await loadingInvoices();
            }
        )()
    }, []);    

    const handleXmlUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const response = await api.post('/invoice/xml', {
                xml_attachment: data.get('xml')
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            notification({
                message: 'XML importada com sucesso',
                type: 'success'
            });

            setOpenDlgXml(false);

            await loadingInvoices();

            return;

        } catch(error: any) {
            const { message } = error.response.data;
            notification({
                message: message,
                type: 'error'
            });
        }

    }

    const handleInvoiceSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        try {
                await api.post('/invoice', {
                    nfe_number: data.get('nfe_number'),
                    nfe_gross_weight: data.get('nfe_gross_weight'),
                    nfe_net_weight: data.get('nfe_net_weight'),
                    need_date: data.get('need_date'),
                    freight_value: data.get('freight_value'),
                    shipper: user.business,
                    boarding: data.get('boarding'),
                    boarding_detail: data.get('boarding_detail'),
                    landing: data.get('landing'),
                    landing_detail: data.get('landing_detail'),
                    nfe_attachment: '',
                    items: newItemsInvoice
                },                
            );           

            await loadingInvoices()

            setOpenDlgNewInvoive(false)
            cleanItemsNewInvoice()
            setNewItemsInvoice([])

            notification({
                message: 'Nota fiscal cadastrada com sucesso',
                type: 'success'
            });

       } catch (error: any) {
            notification({
                message: error.response.data.message,
                type: 'error'
            });
       }
    }

    const cleanItemsNewInvoice = () => {
        setDescriptionItem('')
        setValueItem('')
        setGrossWeightItem('')
        setNetWeightItem('')
    }

    const handleAddItemsInvoice = () => {
        setNewItemsInvoice([...newItemsInvoice, {
            description: descriptionItem,
            gross_weight: Number(grossWeightItem),
            net_weight: netWeightItem,
            value: Number(valueItem),
        }])

        cleanItemsNewInvoice()       
    }

    return (
        <Menu>
            <h2>Notas Fiscais</h2>
            <TableContainer component={Paper}>
                <Table
                    aria-label='collapse table'
                >
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>nº Docto</TableCell>
                            <TableCell>Emissão</TableCell>
                            <TableCell>Entrega</TableCell>
                            <TableCell>Peso Bruto(kg)</TableCell>
                            <TableCell>Vlr. Frete</TableCell> 
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            invoices.map(invoice => (
                                <Row key={invoice.nfe_number+invoice.shipper}  invoice={invoice} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            
            <div
                style={{ 
                    display: 'flex', 
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                    maxWidth: '62ch'
                }}
            >

                <Button 
                    variant="contained" 
                    color="success"
                    endIcon={<Add />}
                    sx={{ 
                        width: '33ch',
                        marginTop: '5ch'
                    }}
                    onClick={() => setOpenDlgNewInvoive(true)}
                >
                    Adicionar nota fiscal
                </Button>

                <Button 
                    variant="contained" 
                    color="info"
                    endIcon={<Add />}
                    sx={{ 
                        width: '28ch',
                        marginTop: '5ch'
                    }}
                    onClick={() => setOpenDlgXml(true)}
                >
                    Importar XML    
                </Button>

            </div>


            <Dialog
                open={openDlgXml}
                onClose={() => setOpenDlgXml(false)}
            >
                <DialogTitle>Importar arquivo XML</DialogTitle>

                <DialogContent>                    
                    <Box 
                        component='form'
                        onSubmit={handleXmlUpload}
                        noValidate
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                        
                    >
                           
                        <Dropzone name='xml' labelInputFile='Importar xml' />                       
                        

                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="error"
                                endIcon={<Close />}
                                onClick={() => setOpenDlgXml(false)}
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
                open={openDlgNewInvoive}
                onClose={() => setOpenDlgNewInvoive(false)}
                fullScreen
            >
                <DialogTitle>Cadastrar Nota Fiscal</DialogTitle>
                <DialogContent>
                    <Box 
                        component='form'
                        onSubmit={handleInvoiceSubmit}
                        noValidate
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                        <div style={{ 'maxWidth': '1280px' }}>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='nfe_number'
                                label='Número'
                                name='nfe_number'
                                sx={{ m: 1, width: '18ch' }}
                                value={newInvoice.nfe_number}                                
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='need_date'
                                label='Data necessidade'
                                name='need_date'
                                type="date"
                                InputLabelProps={{ shrink: true, required: true }}
                                sx={{ m: 1, width: '20ch' }}
                                value={newInvoice.need_date}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='freight_value'
                                label='Valor frete'
                                name='freight_value'
                                sx={{ m: 1, width: '18ch' }}
                                value={newInvoice.freight_value}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='nfe_gross_weight'
                                label='Peso bruto'
                                name='nfe_gross_weight'
                                sx={{ m: 1, width: '18ch' }}
                                value={newInvoice.nfe_gross_weight}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='nfe_net_weight'
                                label='Peso líquido'
                                name='nfe_net_weight'
                                sx={{ m: 1, width: '18ch' }}
                                value={newInvoice.nfe_net_weight}
                            />
                            
                            <TextField
                                margin='normal'
                                fullWidth
                                id='shipper'
                                label='CNPJ embarcador'
                                name='shipper'
                                sx={{ m: 1, width: '28ch' }}
                                value={user.business}
                                disabled
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='boarding'
                                label='Local embarque'
                                name='boarding'
                                sx={{ m: 1, width: '22ch' }}
                                value={newInvoice.boarding}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='boarding_detail'
                                label='Endereço embarque'
                                name='boarding_detail'
                                sx={{ m: 1, width: '36ch' }}
                                value={newInvoice.boarding_detail}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='landing'
                                label='Local entrega'
                                name='landing'
                                sx={{ m: 1, width: '22ch' }}
                                value={newInvoice.landing}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='landing_detail'
                                label='Endereço entrega'
                                name='landing_detail'
                                sx={{ m: 1, width: '36ch' }}
                                value={newInvoice.landing_detail}
                            />
                        
                        </div>
                        
                        <div style={{ 'display': 'block', 'width' : '100%' }} >

                            <InputLabel id='label-invoice'  sx={{ m: 1, width: '36ch' }} >Itens</InputLabel> 


                            <Select
                                 sx={{ m: 1, width: '120ch' }}
                                native
                                multiple
                                id='invoice'
                                value={invoices}
                                onChange={() => {}}
                            >
                                {
                                    newItemsInvoice.map((item, indice) => (
                                        <option value={item.description} key={indice}>
                                           Descrição: {item.description} - Valor:  {item.value.toString()} -  Peso Bruto: {item.gross_weight} - UN: {item.net_weight}
                                        </option>
                                    ))
                                }                                    
                            </Select>
                            
                            <div style={{ 'lineHeight': '4' }} >
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='description'
                                    label='Descrição'
                                    name='description'
                                    sx={{ m: 1, width: '36ch' }}
                                    value={descriptionItem}
                                    onChange={(event) => {
                                        setDescriptionItem(event.target.value)
                                    }}
                                />
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='value'
                                    label='Valor'
                                    name='value'
                                    sx={{ m: 1, width: '22ch' }}
                                    value={valueItem}
                                    onChange={(event) => {
                                        setValueItem(event.target.value)
                                    }}
                                />
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='gross_weight'
                                    label='NCM'
                                    name='gross_weight'
                                    sx={{ m: 1, width: '14ch' }}
                                    value={grossWeightItem}
                                    onChange={(event) => {
                                        setGrossWeightItem(event.target.value)
                                    }}
                                />
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='net_weight'
                                    label='Unid. medida'
                                    name='net_weight'
                                    sx={{ m: 1, width: '14ch' }}
                                    value={netWeightItem}
                                    onChange={(event) => {
                                        setNetWeightItem(event.target.value)
                                    }}
                                />                            

                                <Button 
                                    variant="contained" 
                                    color="success"
                                    endIcon={<PlusOne />}
                                    type='button'
                                    onClick={handleAddItemsInvoice}
                                >
                                    Adicionar item
                                </Button>

                            </div>

                        </div>

                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="error"
                                endIcon={<Close />}
                                onClick={() => {
                                    cleanItemsNewInvoice()
                                    setNewItemsInvoice([])
                                    setOpenDlgNewInvoive(false)
                                }}
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