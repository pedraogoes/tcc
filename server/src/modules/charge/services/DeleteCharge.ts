import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Charge } from '../entities/Charge';
import { ItemsCharge } from '../entities/itemsCharge';

export class DeleteCharge {

    public async run(id: string): Promise<void> {
        const chargeRepo = (await dataSource).getRepository(Charge);
        const itemsChargeRepo = (await dataSource).getRepository(ItemsCharge);

        const charge = await chargeRepo.findOneBy({ id: Number(id) });

        if(!charge) {
            throw new AppErrors('Nenhuma carga encontrada, tente novamente.', 401);
        }

        if(charge.cte_number) {
            throw new AppErrors('CT-e emitido para carga, deve ser cancelado.', 401);
        }

        await itemsChargeRepo.delete({ charge_id: id });

        await chargeRepo.delete({ id: Number(id) });
    }
}