import { Router } from 'express';
import fileupload from 'express-fileupload';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';
import { InvoiceController } from '../controllers/InvoiceController';

const invoiceController = new InvoiceController();

const invoice = Router();

invoice.post('/xml', ensureAuthenticate, fileupload(), invoiceController.createXml);
invoice.post('/', ensureAuthenticate, invoiceController.create);
invoice.get('/charge', ensureAuthenticate, invoiceController.findByConveyor);
invoice.get('/', ensureAuthenticate, invoiceController.findByShipper);
invoice.get('/items/:invoice', ensureAuthenticate, invoiceController.findItemsByCharge);
invoice.delete('/:invoice', ensureAuthenticate, invoiceController.delete);
invoice.put('/freight', ensureAuthenticate, invoiceController.updateFreight);
invoice.put('/gross', ensureAuthenticate, invoiceController.updateGrossWeight);

export default invoice;