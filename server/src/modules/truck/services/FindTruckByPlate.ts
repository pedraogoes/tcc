import { dataSource } from "../../../shared/databases/connection";
import { Truck } from "../entities/Truck";

export class FindTruckByPlate {

    public async run(plate: string): Promise<Truck> {
        const truckRepo = (await dataSource).getRepository(Truck);

        const truck =  await truckRepo.findOneBy({ plate });

        if(!truck) {
            throw Error('Nenhum veículo encontrado');
        }

        return truck;
    }
}