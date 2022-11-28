import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Invoice } from '../entities/Invoice';

export class FindInvoiceByConveyor {

    public async run(business: string): Promise<Invoice[]> {
        const invoiceRepo = (await dataSource).getRepository(Invoice);
        
        const sql = `SELECT * FROM invoice WHERE conveyor = '${business}' or conveyor = '' AND charge = '' AND status = 'Aberta' `;

        const invoices  = await invoiceRepo.query(sql) as Invoice[];
        
        if(invoices.length === 0) {
            throw new AppErrors('Nenhuma nota fiscal encontrada', 401);
        }

        return invoices;
    }
}