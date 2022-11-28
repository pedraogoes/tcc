import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { ItemsCharge } from '../entities/itemsCharge';

export class FindItemsByCharge {

    public async run(charge: string): Promise<ItemsCharge[]> {
        const itemsChargeRepo = (await dataSource).getRepository(ItemsCharge);

        const items = await itemsChargeRepo.find({
            where: {
                charge_id: charge
            },
            relations: ['invoice']
        })

        if(items.length === 0) {
            throw new AppErrors('Nenhum item encontrada', 401);
        }

        return items;
    }
}