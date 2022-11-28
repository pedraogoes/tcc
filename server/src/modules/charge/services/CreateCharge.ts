import { dataSource } from '../../../shared/databases/connection';
import { Charge } from '../entities/Charge';
import { ItemsCharge } from '../entities/itemsCharge';
import { AppErrors } from '../../../shared/errors/AppErrors';

interface ICharge {
    driver: string,
    truck: string,
    freight_value?: number,
    business: string,
    items: string[]
}

export class CreateCharge {

    public async run({
        driver,
        truck,
        freight_value,
        business,
        items
    }: ICharge): Promise<Charge> {
        const chargeRepo = (await dataSource).getRepository(Charge);
        const itemsChargeRepo = (await dataSource).getRepository(ItemsCharge);
        let verifyItems = '';

        for(var i = 0; i < items.length; i++) {
            if(i === 0) {
                verifyItems = "'"+items[i]+"'";
            }else{
                verifyItems = verifyItems+','+"'"+items[i]+"'";
            }
        }

        const sql = `SELECT * FROM charge_items WHERE invoice_id IN (${verifyItems})`;

        const invoiceExistsInTheCharge = await itemsChargeRepo.query(sql);
        
        if(invoiceExistsInTheCharge.length > 0) {
            throw new AppErrors(`Nota fiscal já inserida em uma carga`, 401);
        }
       
        const newCharge = chargeRepo.create({
            driver,
            truck,
            freight_value,
            business,
            status: 'Aberta',
            cte_number: '',
            cte_attachment: ''
        });

        const charge = await chargeRepo.save(newCharge);

        items.map(async (item) => {
            let newItem = itemsChargeRepo.create({
                charge_id: charge.id.toString(),
                invoice_id: item
            });

            await itemsChargeRepo.save(newItem);
        });

        return charge;
    }
}