import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { DriverToBusiness } from '../entities/DriverToBusiness';


export class DeleteDriver {

    public async run(driver_id: string, business: string): Promise<void> {
        const dToBRepo = (await dataSource).getRepository(DriverToBusiness);

        const driverToBusiness = await dToBRepo.findOneBy({ driver_id, business_code: business });

        if(!driverToBusiness) {
            throw new AppErrors('Nenhum motorista encontrado', 401);
        }

        try {            
            await dToBRepo.delete({ id: driverToBusiness.id});

            return;
        } catch (err) {
            throw new AppErrors('Erro ao delete motorista', 401);
        }
    }
}