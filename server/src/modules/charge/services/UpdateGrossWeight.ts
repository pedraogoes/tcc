import { dataSource } from "../../../shared/databases/connection";
import { AppErrors } from "../../../shared/errors/AppErrors";
import { Invoice } from "../entities/Invoice";

interface IUpdateFreightValue {
    invoice_id: string;
    gross_weight: number;
}

export class UpdateGrossWeight {
    
    public async run({ gross_weight, invoice_id }: IUpdateFreightValue): Promise<Invoice> {
        const invoiceRepo = (await dataSource).getRepository(Invoice);

        const invoice = await invoiceRepo.findOneBy({ id: invoice_id });

        if(!invoice)  {
            throw new AppErrors('Nota fiscal não encontrada', 401);
        }

        try {            

            if(invoice.nfe_net_weight === 0) {
                invoice.nfe_net_weight = gross_weight
            } else {
                let diff = (((invoice.nfe_gross_weight - invoice.nfe_net_weight) / invoice.nfe_gross_weight * 100) / 100);

                let newNetWeight = (gross_weight - (gross_weight * diff));

                invoice.nfe_net_weight = Number.parseInt(newNetWeight.toString());
            }

            invoice.nfe_gross_weight = Number.parseInt(gross_weight.toString());

            await invoiceRepo.save(invoice)

            return invoice
        } catch (error) {
            console.log(error)
            throw new AppErrors('Erro ao atualiza peso bruto da nota fiscal', 401);
        }        
    }
}