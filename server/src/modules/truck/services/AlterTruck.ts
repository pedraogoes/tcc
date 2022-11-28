import { dataSource } from "../../../shared/databases/connection";
import { AppErrors } from "../../../shared/errors/AppErrors";
import { Truck } from "../entities/Truck";

interface IAlterTruck {
    plate: string;
    model?: string;
    brand?: string;
    type?: string;
    weigth?: string;
    capacity?: string;
    status: boolean;
}

export class AlterTruck {

    public async run({
        plate,
        model,
        brand,
        type,
        weigth,
        capacity,
        status
    }: IAlterTruck): Promise<void> {

        const truckRepo = (await dataSource).getRepository(Truck);

        const truck = await truckRepo.findOneBy({ plate });

        if(!truck) {
            throw new AppErrors('Nenhum veículo encontrado', 401);
        }

        try {             

            await truckRepo.update({ plate }, {
                model,
                brand,
                type,
                weigth,
                capacity,
                status
            });

            return;
        } catch (error) {
            throw new AppErrors('Erro ao atualizar veículo, tente novamente', 401);
        }        
    }
}