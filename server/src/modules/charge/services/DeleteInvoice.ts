import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Invoice } from '../entities/Invoice';
import { ItemsInvoice } from '../entities/ItemsInvoice';
import { ItemsCharge } from '../../charge/entities/itemsCharge'


export class DeleteInvoice {

    public async run(invoice_id: string): Promise<void> {
        const invoiceRepo = (await dataSource).getRepository(Invoice);
        const itemsInvoiceRepo = (await dataSource).getRepository(ItemsInvoice);
        const itemsCharge = (await dataSource).getRepository(ItemsCharge);

        const invoiceExist = await invoiceRepo.findOneBy({
            id: invoice_id
        });

        const invoiceInCharge = await itemsCharge.findOneBy({ invoice_id })

        if(invoiceInCharge) {
            throw new AppErrors(`Nota fiscal está na carga ${invoiceInCharge.charge_id}`, 401);
        }

        if(!invoiceExist) {
            throw new AppErrors('Nota fiscal não encontrada', 401);
        }

        try {

            await itemsInvoiceRepo.delete({ invoice_id })

            await invoiceRepo.delete({ id: invoice_id });
            
        } catch (err) {
            throw new AppErrors('Erro ao excluir nota fiscal, tente novamente!', 401);
        }

    }
}