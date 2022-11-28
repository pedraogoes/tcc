import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Invoice } from '../entities/Invoice';

export class FindInvoiceByShipper {

    public async run(business: string): Promise<Invoice[]> {
        const invoiceRepo = (await dataSource).getRepository(Invoice);

        const invoices = await invoiceRepo.findBy({ shipper: business });

        if(invoices.length === 0) {
            throw new AppErrors('Nenhuma nota fiscal encontrada', 401);
        }

        return invoices;
    }
}