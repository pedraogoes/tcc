import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Charge } from '../entities/Charge';

export class FindByBusiness {

    public async run(business: string): Promise<Charge[]> {
        const chargeRepo = (await dataSource).getRepository(Charge);

        const charges = await chargeRepo.find({ 
            where: {
                business                
            }
        });

        if(charges.length === 0) {
            throw new AppErrors('Nenhuma carga encontrada', 401);
        }

        return charges;
    }
}