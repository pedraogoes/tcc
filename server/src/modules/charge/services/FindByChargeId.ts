import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Charge } from '../entities/Charge';

export class FindByChargeId {

    public async run(id: number, business: string): Promise<Charge> {
        const chargeRepo = (await dataSource).getRepository(Charge);

        const charge = await chargeRepo.findOneBy({ id, business });

        if(!charge) {
            throw new AppErrors('Nenhuma carga encontrada', 401);
        }

        return charge;
    }
}