import { dataSource } from '../../../shared/databases/connection';
import { AppErrors } from '../../../shared/errors/AppErrors';
import { Truck } from "../entities/Truck";
import { TruckToBusiness } from '../entities/TruckToBusiness';

interface ICreateTruck {
    plate: string;
    model?: string;
    brand?: string;
    type?: string;
    weigth?: string;
    capacity?: string;
    business: string;
}

export class CreateTruck {
    public async run({
        plate,
        model,
        brand,
        type,
        weigth, 
        capacity,
        business
    }: ICreateTruck): Promise<Truck> {
        let truck: Truck | null;
        const truckRepo = (await dataSource).getRepository(Truck);
        const tToBRepo = (await dataSource).getRepository(TruckToBusiness)

        truck = await truckRepo.findOneBy({ plate });

        if(!truck) {            

            try {
                truck = truckRepo.create({
                    plate,
                    model,
                    brand,
                    type,
                    weigth,
                    capacity,
                    status: true
                });

                await truckRepo.save(truck);

                return truck;
            } catch (error) {
                throw new AppErrors('Error ao salvar veículo', 401);
            }
        }

        const truckToBusinessExists = await tToBRepo.findOneBy({
            truck_plate: truck.plate,
            business_code: business
        });

        if(truckToBusinessExists) {
            throw new AppErrors('Veículo já cadastro', 401);
        }

        try {
            const truckToBusiness = tToBRepo.create({
                truck_plate: truck.plate,
                business_code: business
            });

            await tToBRepo.save(truckToBusiness);

            return truck;
        } catch (error) {
            throw new AppErrors('Erro ao cadastras veículo, tente novamente', 401);
        }

    }
}