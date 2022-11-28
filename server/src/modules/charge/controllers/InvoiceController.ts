import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CreateInvoice } from '../services/CreateInvoice';
import { FieldXmlFileNFe } from '../services/FieldXmlFileNFe';
import { FindInvoiceByShipper } from '../services/FindInvoiceByShipper';
import { FindInvoiceByConveyor } from '../services/FindInvoiceByConveyor';
import { FindItemsInvoice } from '../services/FindItemsInvoice';
import { DeleteInvoice } from '../services/DeleteInvoice';
import { UpdateFreightValue } from '../services/UpdateFreightValue';
import { UpdateGrossWeight } from '../services/UpdateGrossWeight';

const createInvoice = new CreateInvoice();
const fieldXmlFileNFe = new FieldXmlFileNFe();
const findInvoiceByBusiness = new FindInvoiceByShipper();
const findInvoiceByConveyor = new FindInvoiceByConveyor();
const findItemsInvoice = new FindItemsInvoice();
const deleteInvoice = new DeleteInvoice();
const updateFreightValue = new UpdateFreightValue();
const updateGrossWeight = new UpdateGrossWeight();

export class InvoiceController {

    public async createXml(req: Request, res: Response): Promise<Response> {

        const updatededFile  = req.files?.xml_attachment as UploadedFile;       

        const xmlInfo = await fieldXmlFileNFe.run({ xml: updatededFile.data })
        const invoice = await createInvoice.run(xmlInfo); 

        return res.status(201).json(invoice);       

    }

    public async create(req: Request, res: Response): Promise<Response> {   
        
        const {
            nfe_number,
            nfe_gross_weight,
            nfe_net_weight,
            need_date,
            freight_value,
            shipper,
            boarding,
            boarding_detail,
            landing,
            landing_detail,
            nfe_attachment,
            items
        } = req.body;

        const invoice = await createInvoice.run({
            nfe_number,
            nfe_gross_weight,
            nfe_net_weight,
            need_date,
            freight_value,
            shipper,
            boarding,
            boarding_detail,
            landing,
            landing_detail,
            nfe_attachment,
            items       
        });

        return res.status(201).json(invoice);
    }

    public async findByShipper(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const invoices = await findInvoiceByBusiness.run(business);

        return res.status(201).json(invoices);
    }

    public async findByConveyor(req: Request, res: Response): Promise<Response> {
        const { business } = req.user;

        const invoices = await findInvoiceByConveyor.run(business);

        return res.status(201).json(invoices);
    }

    public async findItemsByCharge(req: Request, res: Response): Promise<Response> {
        const { invoice } = req.params;

        const items = await findItemsInvoice.run(invoice);

        return res.status(201).json(items)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { invoice } = req.params;

        await deleteInvoice.run(invoice);

        return res.status(200).send();
    }

    public async updateFreight(req: Request, res: Response): Promise<Response> {
        const { invoice_id, freight_value } = req.body;

        const invoice = await updateFreightValue.run({ invoice_id, freight_value })

        return res.status(201).json(invoice)
    }

    public async updateGrossWeight(req: Request, res: Response): Promise<Response> {
        const { invoice_id, gross_weight } = req.body;

        const invoice = await updateGrossWeight.run({ invoice_id, gross_weight })

        return res.status(201).json(invoice)
    }
}