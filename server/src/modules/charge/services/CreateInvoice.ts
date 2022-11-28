import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Invoice } from '../entities/Invoice';
import { ItemsInvoice } from '../entities/ItemsInvoice';

interface IInvoiceItems {
    description: string;
    value: number;
    gross_weight: number;
    net_weight: string;
}

interface IInvoice {
    nfe_number: string,
    nfe_gross_weight: number,
    nfe_net_weight: number,
    need_date: Date,
    freight_value?: number,
    shipper: string,
    boarding: string,
    boarding_detail: string;
    landing: string,
    landing_detail: string;
    nfe_attachment: string,
    items: IInvoiceItems[]
}

export class CreateInvoice {

    public async run({
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
    }: IInvoice): Promise<string> {
        const invoiceRepo = (await dataSource).getRepository(Invoice);
        const itemsInvoiceRepo = (await dataSource).getRepository(ItemsInvoice);

        const invoiceExist = await invoiceRepo.findOneBy({
            nfe_number,
            shipper
        });

        if(invoiceExist) {
            throw new AppErrors('Nota fiscal já cadastrada', 401);
        }


        try {
            const newInvoice = invoiceRepo.create({
                nfe_number,
                nfe_gross_weight,
                nfe_net_weight,
                need_date,
                freight_value: freight_value ? Number.parseInt(freight_value.toString()) : 0,
                driver: '',
                truck: '',
                shipper,
                conveyor: '',
                boarding,
                boarding_detail,
                landing,
                landing_detail,
                nfe_attachment,
                charge: '',
                status: 'Aberta',
            });

            const invoice = await invoiceRepo.save(newInvoice);

            items.map(async (item) => {
                let newItem = itemsInvoiceRepo.create({
                    invoice_id: invoice.id,
                    description: item.description,
                    value: item.value,
                    gross_weight: item.gross_weight,
                    net_weight: item.net_weight
                });

                await itemsInvoiceRepo.save(newItem);
            });

            return invoice.id;
        } catch (err) {
            console.log(err)
            throw new AppErrors('Erro ao cadastrar nota fiscal, tente novamente!', 401);
        }

    }
}