import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { ItemsInvoice } from '../entities/ItemsInvoice';

export class FindItemsInvoice {

    public async run(invoice: string): Promise<ItemsInvoice[]> {
        const itemsInvoiceRepo = (await dataSource).getRepository(ItemsInvoice);

        const items = await itemsInvoiceRepo.findBy({ invoice_id: invoice });

        if(items.length === 0) {
            throw new AppErrors('Nenhum item encontrada', 401);
        }

        return items;
    }
}