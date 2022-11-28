import { dataSource } from "../../../shared/databases/connection";
import { AppErrors } from "../../../shared/errors/AppErrors";
import { Truck } from "../entities/Truck";


export class DeleteTruck {

    public async run(plate: string): Promise<void> {
        const truckRepo = (await dataSource).getRepository(Truck);

        const truck = await truckRepo.findOneBy({ plate });

        if(!truck) {
            throw new AppErrors('Nenhum veículo encontrado', 401);
        }

        try {

            await truckRepo.delete({ plate });

            return;
        } catch (err) {
            throw new AppErrors('Erro ao delete veículo', 401);
        }
    }
}