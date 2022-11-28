import { dataSource } from "../../../shared/databases/connection";
import { AppErrors } from "../../../shared/errors/AppErrors";
import { Invoice } from "../entities/Invoice";

interface IUpdateFreightValue {
    invoice_id: string;
    freight_value: number;
}

export class UpdateFreightValue {
    
    public async run({ freight_value, invoice_id }: IUpdateFreightValue): Promise<Invoice> {
        const invoiceRepo = (await dataSource).getRepository(Invoice);

        const invoice = await invoiceRepo.findOneBy({ id: invoice_id });

        if(!invoice)  {
            throw new AppErrors('Nota fiscal não encontrada', 401);
        }

        try {
            invoice.freight_value = freight_value;

            await invoiceRepo.save(invoice)

            return invoice
        } catch (error) {
            console.log(error)
            throw new AppErrors('Erro ao atualiza frete da nota fiscal', 401);
        }        
    }
}